import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import _ from 'lodash';
import { compose } from 'recompose';
import {
  Grid,
  ListView,
  SegmentedControl,
  WhiteSpace,
  WingBlank,
} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

import Separator from 'components/List/Separator';
// import ListRowMove from 'components/List/ListRowMove';
import GridItem from 'components/List/GridItem';
import SlideUpModal from 'components/SlideUpModal';

import { condSwitch, withSegmentState } from 'utils/enhancers';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';

import { connectActiveSegmentProps } from 'selectors/skill_mode';
import { withNutritionCards } from 'selectors/nutrition';
import { withCombatSkill } from 'selectors/combat';
import { withKnowledgeCards } from 'selectors/knowledge';

import saga from './saga';
import CONSTANTS from './constants';

const ListFooter = ({ isLoading }) => (
  <div style={{ padding: 10, textAlign: 'center' }}>
    {isLoading ? 'Loading...' : ''}
  </div>
);

/* eslint-disable react/prefer-stateless-function */
class ViewCards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  handleValueChange = value => {
    const { onValueChange } = this.props;
    onValueChange(value);

    const ds = this.state.dataSource;
    const propToGet = {
      Move: 'combatMove',
      Sequence: 'combatSequence',
    };

    const dataProp = propToGet[value] || 'dataById';

    this.setState(() => ({
      // activeForm: value,
      dataSource: ds.cloneWithRows(this.props[dataProp]),
    }));
  };

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataById !== this.props.dataById) {
      const ds = this.state.dataSource;
      this.setState(() => ({
        dataSource: ds.cloneWithRows(nextProps.dataById),
      }));
    }
  }

  setRef = el => {
    this.lv = el;
  };

  makehHandlePress = card => () => this.handlePress(card);

  handlePress = card => {
    const delta = new Date().getTime() - this.state.lastPress;

    if (delta < 200) {
      // double tap happend
      this.props.dispatch({
        type: CONSTANTS.card.ADD_TO_CONSUME,
        payload: {
          card,
          afterTimeout: () => {
            this.setState({
              modalVisible: true,
            });
          },
        },
      });
    }

    this.setState({
      lastPress: new Date().getTime(),
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const {
      activeMode,
      activeIndex,
      cartConfirming,
      data,
      dataSource,
      handleSegmentChange,
      isLoading,
      tintColor,
      values,
      handleFilterClick,
      ...rest
    } = this.props;

    return (
      <StickyContainer
        className="sticky-container"
        style={{ zIndex: 4, paddingTop: 55 }}
      >
        <SlideUpModal
          visible={this.state.modalVisible}
          closeModal={this.closeModal}
        />
        <WingBlank size="md">
          {/* <Sticky topOffset={100}>
            {({ style }) => (
              <SegmentedControl
                onChange={handleSegmentChange}
                onValueChange={this.handleValueChange}
                selectedIndex={activeIndex}
                style={{ ...style, zIndex: 4, top: 45 }}
                tintColor={tintColor}
                values={values}
              />
            )}
          </Sticky> */}
          <Grid
            data={rest.next}
            columnNum={8}
            renderItem={letter => (
              <TouchableOpacity onPress={() => handleFilterClick(letter)}>
                <Text>{letter}</Text>
              </TouchableOpacity>
            )}
          />
          <WhiteSpace size="sm" />
          <Grid
            data={data}
            columnNum={2}
            renderItem={item => (
              <GridItem
                handlePress={this.makehHandlePress(item)}
                numInCart={cartConfirming.get(item.cardId)}
                activeMode={activeMode}
                {...item}
              />
            )}
          />
          {/* <ListView
            className="am-list"
            dataSource={dataSource}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
            pageSize={4}
            ref={this.setRef}
            initialListSize={100}
            renderFooter={() => <ListFooter isLoading={isLoading} />}
            renderRow={row => (
              <ListRowMove
                {...row}
                handlePress={this.makehHandlePress(row)}
                numInCart={cartConfirming.get(row.cardId)}
                activeMode={activeMode}
              />
            )}
            renderSeparator={Separator}
            scrollRenderAheadDistance={500}
            useBodyScroll
          /> */}
        </WingBlank>
      </StickyContainer>
    );
  }
}

export default compose(
  injectSaga({ key: 'MediaUpload', saga, mode: DAEMON }),
  connectActiveSegmentProps,
  withSegmentState,
  condSwitch(
    [props => props.activeMode === 'combat', withCombatSkill],
    [props => props.activeMode === 'nutrition', withNutritionCards],
    [props => props.activeMode === 'knowledge', withKnowledgeCards],
  ),
)(ViewCards);

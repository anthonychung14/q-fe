import React from 'react';
import _ from 'lodash';
import { compose } from 'recompose';
import { ListView, SegmentedControl, WhiteSpace, WingBlank } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

import Separator from 'components/List/Separator';
import ListRowMove from 'components/List/ListRowMove';
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
    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    //
    if (!props.isLoading && Object.keys(_.get(props, 'dataById', {}))) {
      dataSource = dataSource.cloneWithRows(props.dataById);
    }

    this.state = {
      dataSource,
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
      activeIndex,
      cartConfirming,
      dataSource,
      handleSegmentChange,
      isLoading,
      tintColor,
      values,
    } = this.props;

    return (
      <div>
        <StickyContainer
          className="sticky-container"
          style={{ zIndex: 4, paddingTop: 55 }}
        >
          <SlideUpModal
            visible={this.state.modalVisible}
            closeModal={this.closeModal}
          />
          <WingBlank size="md">
            <Sticky topOffset={100}>
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
            </Sticky>
            <WhiteSpace size="lg" />
            <ListView
              className="am-list"
              dataSource={dataSource}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
              pageSize={4}
              ref={this.setRef}
              renderFooter={() => <ListFooter isLoading={isLoading} />}
              renderRow={row => (
                <ListRowMove
                  {...row}
                  handlePress={this.makehHandlePress(row)}
                  numInCart={cartConfirming.get(row.cardId)}
                />
              )}
              renderSeparator={Separator}
              scrollRenderAheadDistance={500}
              useBodyScroll
            />
          </WingBlank>
        </StickyContainer>
      </div>
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

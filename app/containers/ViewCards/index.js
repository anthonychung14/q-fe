import React from 'react';
import { compose } from 'recompose';
import { Grid, WhiteSpace, WingBlank } from 'antd-mobile';
import { StickyContainer } from 'react-sticky';

import GridItem from 'components/List/GridItem';
import SlideUpModal from 'components/SlideUpModal';
import SearchKeypad from 'components/SearchKeypad';

import { condSwitch, withSegmentState } from 'utils/enhancers';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';

import { connectActiveSegmentProps } from 'selectors/skill_mode';
import { withNutritionCards } from 'selectors/nutrition';
import { withCombatSkill } from 'selectors/combat';
import { withKnowledgeCards } from 'selectors/knowledge';

import saga from './saga';
import CONSTANTS from './constants';

/* eslint-disable react/prefer-stateless-function */
class ViewCards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      lastPress: null,
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

    if (this.state.dataSource) {
      this.setState(() => ({
        // activeForm: value,
        dataSource: ds.cloneWithRows(this.props[dataProp]),
      }));
    }
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

  makeHandlePress = card => () => this.handlePress(card);

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
      handleFilterClick,
      isLoading,
      tintColor,
      values,
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
          <SearchKeypad
            nextLetters={rest.nextLetters}
            handleFilterClick={handleFilterClick}
          />
          <WhiteSpace size="sm" />
          <Grid
            data={data}
            columnNum={2}
            renderItem={item => (
              <GridItem
                handlePress={this.makeHandlePress(item)}
                numInCart={cartConfirming.get(item.cardId)}
                activeMode={activeMode}
                {...item}
              />
            )}
          />
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

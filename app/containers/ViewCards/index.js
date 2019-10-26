import React from 'react';
import { compose, defaultProps, withHandlers } from 'recompose';
import { ListView, SegmentedControl, WhiteSpace, WingBlank } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

import Separator from 'components/List/Separator';
import ListRowMove from 'components/List/ListRowMove';
import { withSegmentState } from 'components/SegmentBar/enhancers';

import COLORS from 'constants/colors';

import {
  mapCombatFirebaseToProps,
  mapCombatCardsToDataSource,
} from 'selectors/combat';

const ViewSegments = ['Move', 'Sequence'];

const ListFooter = ({ isLoading }) => (
  <div style={{ padding: 10, textAlign: 'center' }}>
    {isLoading ? 'Loading...' : ''}
  </div>
);

/* eslint-disable react/prefer-stateless-function */
class ViewCards extends React.PureComponent {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    //
    if (!props.isLoading && Object.keys(props.combatMove)) {
      dataSource = dataSource.cloneWithRows(props.combatMove);
    }

    this.state = {
      dataSource,
      // activeForm: ViewSegments[0],
    };
  }

  onValueChange = value => {
    const ds = this.state.dataSource;
    const propToGet = {
      Move: 'combatMove',
      Sequence: 'combatSequence',
    };

    const dataProp = propToGet[value];

    this.setState(() => ({
      // activeForm: value,
      dataSource: ds.cloneWithRows(this.props[dataProp]),
    }));
  };

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    if (nextProps.combatMove !== this.props.combatMove) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.combatMove),
      });
    }
  }

  setRef = el => {
    this.lv = el;
  };

  render() {
    const {
      activeIndex,
      dataSource,
      isLoading,
      handleSegmentChange,
      handlePress,
    } = this.props;

    return (
      <StickyContainer
        className="sticky-container"
        style={{ zIndex: 4, paddingTop: 50 }}
      >
        <WingBlank size="md">
          <Sticky topOffset={100}>
            {({ style }) => (
              <SegmentedControl
                onChange={handleSegmentChange}
                onValueChange={this.onValueChange}
                selectedIndex={activeIndex}
                style={{ ...style, zIndex: 4, top: 45 }}
                tintColor={COLORS.primaryGreen}
                values={ViewSegments}
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
            renderRow={move => ListRowMove({ ...move, handlePress })}
            renderSeparator={Separator}
            scrollRenderAheadDistance={500}
            useBodyScroll
          />
        </WingBlank>
      </StickyContainer>
    );
  }
}

export default compose(
  firebaseConnect([
    'combatMove', // { path: '/todos' } // object notation
    'combatSequence',
  ]),
  connect(
    mapCombatFirebaseToProps,
    {},
  ),
  defaultProps({
    combatMove: {},
  }),
  withSegmentState,
  mapCombatCardsToDataSource,
  withHandlers({
    handlePress: () => () => {
      console.log('yes');
    },
  }),
)(ViewCards);

// export default compose(

// )(ViewCards);

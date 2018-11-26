import React from 'react';
import { compose } from 'recompose';
import { ListView, SegmentedControl, WhiteSpace, WingBlank } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

import ViewHeader from 'components/ViewHeader';
import Separator from 'components/List/Separator';
import ListRowMove from 'components/List/ListRowMove';
import { withSegmentState } from 'components/SegmentBar/enhancers';

import COLORS from 'constants/colors';
import { getIsFirebaseRequesting, getCombatMovesById } from './selectors';

const ViewSegments = ['Move', 'Sequence'];

const mapStateToProps = state => ({
  isLoading: getIsFirebaseRequesting(state),
  combatMove: getCombatMovesById(state),
});

const ListFooter = ({ isLoading }) => (
  <div style={{ padding: 10, textAlign: 'center' }}>
    {isLoading ? 'Loading...' : 'Loaded'}
  </div>
);

/* eslint-disable react/prefer-stateless-function */
class ViewCards extends React.PureComponent {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
    };
  }

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
    const { activeIndex, isLoading, handleSegmentChange } = this.props;

    return (
      <StickyContainer className="sticky-container" style={{ zIndex: 4 }}>
        <WingBlank size="md">
          <ViewHeader header="View Cards" />
          <Sticky topOffset={60}>
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
            dataSource={this.state.dataSource}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
            pageSize={4}
            ref={this.setRef}
            renderFooter={() => <ListFooter isLoading={isLoading} />}
            renderRow={ListRowMove}
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
  ]),
  connect(
    mapStateToProps,
    {},
  ),
  withSegmentState,
)(ViewCards);

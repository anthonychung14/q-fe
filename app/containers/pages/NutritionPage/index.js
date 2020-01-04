import React from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'recompose';
// import { useFirebaseConnect, useFirebase } from 'react-redux-firebase';

import { Grid, WhiteSpace, WingBlank, SegmentedControl } from 'antd-mobile';
import { StickyContainer } from 'react-sticky';
import Container from 'components/Container';
import SlideUpModal from 'components/SlideUpModal';
import SearchKeypad from 'components/SearchKeypad';
import GridItem from 'components/List/GridItem';

import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import { withSegmentState } from 'utils/enhancers';

import { getActiveModeData } from 'selectors/skill_mode';
import { withNutritionCards } from 'selectors/nutrition';
import { useDoublePress, useModalVisibility } from './hooks';
import saga from './saga';
// const firebase = useFirebase();
// useFirebaseConnect('incident');
// const incidents = useSelector(state => {
//   return state.get('firebase').ordered.incident;
// });

const NutritionPage = ({
  activeForm,
  activeIndex,
  data,
  handleFilterClick,
  nextLetters,
  onChange,
  onValueChange,
}) => {
  const { activeMode, values, tintColor, cartConfirming } = useSelector(
    getActiveModeData,
  );

  const isSearching = useSelector(state => state.get('search', {}).searching);

  const [visible, closeModal, openModal] = useModalVisibility();
  const [handlePress] = useDoublePress(openModal);
  const makeHandlePress = card => () => handlePress(card);

  return (
    <StickyContainer className="sticky-container" style={{ zIndex: 4 }}>
      <Container type="mode">
        <SegmentedControl
          activeForm={activeForm}
          onChange={onChange}
          onValueChange={onValueChange}
          selectedIndex={activeIndex}
          values={values}
          tintColor={tintColor}
        />
        <SlideUpModal visible={visible} closeModal={closeModal} />
        <WingBlank size="md">
          {isSearching && (
            <SearchKeypad
              nextLetters={nextLetters}
              handleFilterClick={handleFilterClick}
            />
          )}
          <WhiteSpace size="sm" />
          <Grid
            data={data}
            columnNum={2}
            renderItem={item => (
              <GridItem
                handlePress={makeHandlePress(item)}
                numInCart={cartConfirming.get(item.cardId)}
                activeMode={activeMode}
                {...item}
              />
            )}
          />
        </WingBlank>
      </Container>
    </StickyContainer>
  );
};

const Enhanced = compose(
  injectSaga({ key: 'MediaUpload', saga, mode: DAEMON }),
  withSegmentState,
  withNutritionCards,
);

export default Enhanced(NutritionPage);

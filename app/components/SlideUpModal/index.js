import React from 'react';
import { Modal } from 'antd-mobile';
import { compose, withProps } from 'recompose';

import { withFirebase, firebaseConnect } from 'react-redux-firebase';
import { withOnSubmit } from 'containers/CreateResource/formEnhancers';
import {
  NutritionTableParent,
  NutritionData,
} from 'containers/widgets/NutritionTable';

import ButtonGroup from 'components/Button/ButtonGroup';

import { connectGoals } from 'selectors/goals';
import { connectFirebaseForm } from 'selectors/skill_mode';

class SlideUpModal extends React.Component {
  handleConfirm = () => {
    this.props.onBulkSubmit(this.props.cart.toJS());
    this.props.closeModal();
  };

  handleUndo = () => {
    this.props.dispatch({
      type: 'card/EMPTY_RECENT_CART',
    });
    this.props.closeModal();
  };

  handleLater = () => {
    this.props.closeModal();
  };

  render() {
    const {
      activeGoal,
      activeMode,
      cart,
      firebaseData,
      goalCalories,
      maskClosable,
      visible,
    } = this.props;

    return (
      <Modal
        animationType="slide-up"
        maskClosable={maskClosable}
        popup
        transparent
        visible={visible}
      >
        <NutritionTableParent activeMode={activeMode} cart={cart}>
          <NutritionData
            activeGoal={activeGoal}
            cart={cart}
            firebaseData={firebaseData}
            goalCalories={goalCalories}
          />

          <ButtonGroup
            handleUndo={this.handleUndo}
            handleLater={this.handleLater}
            handleConfirm={this.handleConfirm}
          />
        </NutritionTableParent>
      </Modal>
    );
  }
}

export default compose(
  connectGoals,
  withProps(({ googleUID, date }) => ({
    form: `nutrition/consumed/${googleUID}/${date}`,
  })),
  firebaseConnect(props => [props.form]),
  connectFirebaseForm,
  withFirebase,
  withOnSubmit,
)(SlideUpModal);

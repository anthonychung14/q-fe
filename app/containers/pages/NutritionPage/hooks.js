import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import CONSTANTS from './constants';

export function useModalVisibility() {
  const [visible, setVisible] = useState(false);

  const closeModal = useCallback(
    () => {
      setVisible(false);
    },
    [setVisible],
  );

  const openModal = useCallback(
    () => {
      setVisible(true);
    },
    [setVisible],
  );

  return [visible, closeModal, openModal];
}

export function useDoublePress(afterTimeout) {
  const dispatch = useDispatch();
  const [lastPress, setLastPress] = useState(null);

  const handlePress = React.useCallback(
    card => {
      const delta = new Date().getTime() - lastPress;
      if (delta < 200) {
        // double tap happend
        dispatch({
          type: CONSTANTS.card.ADD_TO_CONSUME,
          payload: {
            card,
            afterTimeout,
          },
        });
      }

      setLastPress(new Date().getTime());
    },
    [dispatch, lastPress],
  );

  return [handlePress];
}

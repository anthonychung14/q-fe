import React, { useCallback } from 'react';
import { Icon } from 'antd-mobile';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const SearchButton = () => {
  const dispatch = useDispatch();
  const isSearching = useSelector(state => state.get('search', {}).searching);

  const handleClick = useCallback(
    () => {
      dispatch({
        type: 'search/TOGGLE',
      });
    },
    [dispatch],
  );

  return (
    <TouchableOpacity
      onPress={handleClick}
      style={{ backgroundColor: isSearching ? 'black' : null }}
    >
      <Icon type="search" key={0} />
    </TouchableOpacity>
  );
};

export default SearchButton;

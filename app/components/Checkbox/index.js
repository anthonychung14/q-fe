import _ from 'lodash';
import React from 'react';
// import React, { useEffect } from 'react';
import {
  compose,
  withState,
  lifecycle,
  withHandlers,
  withProps,
} from 'recompose';

import { List, Checkbox as C, WhiteSpace, WingBlank } from 'antd-mobile';
import Container from 'components/Container';

const { CheckboxItem } = C;

const makeHandleCheck = (handleCheck, item) => () => {
  handleCheck(item);
};

const Checkbox = ({ checked, checkboxValues, handleCheck, name }) => {
  // useEffect(
  //   () => {
  //     handleCheck(_.first(checkboxValues));
  //   },
  //   [handleCheck, checkboxValues],
  // );

  return (
    <WingBlank size="md">
      <WhiteSpace size="md" />
      <List renderHeader={() => name}>
        <Container type="empty" horizontal>
          {checkboxValues.map(item => (
            <CheckboxItem
              key={`${item.label}-i`}
              onChange={makeHandleCheck(handleCheck, item)}
              checked={item.value === checked}
            >
              {item.label}
            </CheckboxItem>
          ))}
        </Container>
      </List>
    </WingBlank>
  );
};

export default compose(
  withProps(({ values = [] }) => ({
    checkboxValues: values.map((v, i) => ({ value: i, label: v })),
  })),
  withState('checked', 'setSingleCheck', 0),

  withHandlers({
    handleCheck: ({ setSingleCheck, input }) => item => {
      input.onChange(item.label);
      setSingleCheck(item.value);
    },
  }),
  lifecycle({
    componentDidMount() {
      const { handleCheck, checkboxValues } = this.props;
      handleCheck(_.first(checkboxValues));
    },
  }),
)(Checkbox);

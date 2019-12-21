import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import {
  compose,
  withHandlers,
  withState,
  branch,
  withProps,
  renderComponent,
} from 'recompose';

import { Grid } from 'antd-mobile';
import { Text, View } from 'react-native';
import ButtonGroup from 'components/Button/ButtonGroup';
import FormField from 'components/Form/form_field';

import { connectKeypad } from './enhancers';

const Outer = styled(View)`
  display: flex;
  flex-direction: column;
`;

const Inner = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

// how will I be able to trigger the onChange? // don't need to. when
//    you confirm, have it show in the box. // when you click it, it highlights
//   and then you can trigger the onChange

const KeypadHeaderInput = ({
  keypadInput,
  fieldName,
  handleLater,
  handleUndo,
  handleConfirm,
  startedInput,
}) => (
  <Outer>
    <Inner>
      <h3>{keypadInput}</h3>
      <View>
        <Text>{_.startCase(_.camelCase(fieldName))}</Text>
      </View>
    </Inner>
    <ButtonGroup
      handleLater={handleLater}
      handleUndo={handleUndo}
      handleConfirm={handleConfirm}
    />
  </Outer>
);

// const NumberData = () => (
//   <Inner>
//     <h3>Number Data</h3>
//   </Inner>
// );

const KeypadHeader = branch(
  props => !props.startedInput,
  renderComponent(({ fieldName }) => <h3>{fieldName}</h3>),
)(KeypadHeaderInput);

const Keypad = ({
  columnNum,
  confirming,
  data,
  fieldName,
  form,
  inputKeypadValue,
  keypadInput,
  makeRenderFieldHeader,
  startedInput,
  startInput,
  ...handlers
}) => {
  return (
    <Outer>
      <KeypadHeader
        startedInput={startedInput}
        fieldName={fieldName}
        keypadInput={keypadInput}
        {...handlers}
      />
      <Grid
        data={data}
        columnNum={columnNum}
        renderItem={(field, idx) => (
          <FormField
            field={field}
            form={form}
            renderHeader={makeRenderFieldHeader(
              `${confirming[field.name] != null ? confirming[field.name] : ''}${
                field.name
              }`,
            )}
            opts={{
              idx,
              startedInput,
              startInput,
              inputKeypadValue,
              confirming,
              fieldName,
            }}
          />
        )}
      />
    </Outer>
  );
};

export default compose(
  connectKeypad,
  withState('confirming', 'setConfirming', {}),
  withHandlers({
    handleLater: ({ clearKeypad }) => () => {
      clearKeypad();
    },
    handleUndo: ({ keypadUndo }) => () => {
      keypadUndo();
    },
    handleConfirm: ({
      clearKeypad,
      fieldName,
      keypadInput,
      confirming,
      setConfirming,
    }) => () => {
      // updateConfirming
      // should setState confirming: fieldname
      // all fields subscribed to confirming

      // if confirming matches the field name
      // start a timeout
      // at the end of the timeout, input change the confirming value
      // but, we gotta debounce the timeout
      // setConfirming(confirming.set(fieldName, keypadInput));

      // so, if it no longer matches, clear the timeout

      // passes data by setting confirming prop
      clearKeypad();
      setConfirming({
        ...confirming,
        [fieldName]: Number(keypadInput.toJS().join('')),
      });

      // keypadUndo();
    },
  }),
  branch(
    props => props.type === 'phoneNumber',
    withProps({}),
    withProps(({ data, startedInput }) => {
      // need at least 10 elements
      // append the same prop
      const diff = 10 - data.length;
      const toAppend = [...Array(diff).keys()]
        .map(dIdx => data.length + 2 + dIdx)
        .map(v => ({
          name: v,
          type: 'integer',
          blank: true,
        }));
      return {
        data: data.concat(startedInput ? toAppend : []),
      };
    }),
  ),
)(Keypad);

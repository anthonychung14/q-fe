/**
 * Form field to select a resource
 *
 * @format
 * @flow
 */

import _ from 'lodash';
import * as React from 'react';
import {
  branch,
  renderComponent,
  compose,
  mapProps,
  withHandlers,
  withState,
  withProps,
} from 'recompose';

import { List, WhiteSpace, WingBlank } from 'antd-mobile';
import Autosuggest from 'react-autosuggest';
import TextInput from 'components/TextInput';

import { fetchAirtable } from './enhancers';
// import ResourceSelectorResult from './resource_selector_result';
// import ResourceLink from './resource_link';

const ResourceSelector = ({
  getSuggestionValue,
  name,
  onChange,
  onBlur,
  onSuggestionsClearRequested,
  onSuggestionSelected,
  onSuggestionsFetchRequested,
  searchedRecords = [],
  renderInputComponent,
  renderHeader,
  renderSuggestion,
  searchTerm = '',
}) => (
  <WingBlank size="md">
    <WhiteSpace size="md" />
    <List renderHeader={renderHeader}>
      <Autosuggest
        getSuggestionValue={getSuggestionValue}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        renderInputComponent={renderInputComponent}
        renderSuggestion={renderSuggestion}
        suggestions={searchedRecords}
        inputProps={{
          value: searchTerm,
          placeholder: `Find ${name}`,
          onChange,
          onBlur,
          style: {
            position: 'relative',
            width: '100%',
            height: '45px',
            padding: '10px',
            fontSize: '17px',
          },
        }}
        onSuggestionSelected={onSuggestionSelected}
      />
    </List>
  </WingBlank>
);

// TODO: if unique, add onBlur handler that stores searchTerm as input value
const withSearchFilter = compose(
  withState(
    'searchTerm',
    'setSearchTerm',
    ({ input, unique, ...rest }) =>
      console.log(input, unique, rest, 'filter') ||
      (input.value !== '' && unique)
        ? input.value
        : '',
  ),
  withHandlers({
    onInputChange: ({ setSearchTerm }) => value => {
      setSearchTerm(value);
    },
  }),
  withHandlers({
    onChange: ({ onInputChange }) => event => {
      onInputChange(event.target.value);
    },
    onBlur: ({ input: formInput, unique, searchTerm }) => e => {
      console.log(searchTerm, unique, 'wooooottttt');

      if (unique) {
        formInput.onChange(searchTerm);
      }
    },
  }),
  withProps(({ searchTerm, records }) => ({
    searchedRecords:
      searchTerm !== ''
        ? records.filter(i =>
            _.lowerCase(
            _.get(i, 'fields.title', _.get(i, 'fields.name')),
              searchTerm,
            ),
          )
        : records,
  })),
);

const withSuggestionHandlers = withHandlers({
  onSuggestionSelected: ({ input: formInput, setSearchTerm, unique }) => (
    event,
    { suggestion },
  ) => {
    // navigate to the parent route with their id filling it out
    // let val = ''
    // if (!unique) {

    //   setSearchTerm('');
    //   val = suggestion.id
    // }
    formInput.onChange(suggestion.id);
  },
  onSuggestionsFetchRequested: ({ fetchSuggestions }) => ({ value }) =>
    fetchSuggestions(value),
  onSuggestionsClearRequested: ({ fetchSuggestions }) => () =>
    fetchSuggestions(''),
});

const withRenderers = withHandlers({
  getSuggestionValue: () => hit => hit.id.toString(),
  renderSuggestion: () => hit => (
    <h3>{_.get(hit, 'fields.title', _.get(hit, 'fields.name'))}</h3>
  ),
  // const withForwardingRef = BaseComponent =>
  //   React.forwardRef((props, ref) => (
  //     <BaseComponent {...props} forwardedRef={ref} />
  //   ));

  // const TextInputRef = withForwardingRef(TextInput);

  // renderInputComponent: ({ renderHeader, label }) => inputProps => (
  //   <TextInputRef {...inputProps} renderHeader={renderHeader} label={label} />
  // ),
});

/** 
  There's the input that you see
  There's the input that's being stored
*/

const maybeRenderChosenField = branch(
  props => props.input.value !== '' && !props.unique,
  compose(
    mapProps(props => {
      const { records, input, } = props;
      const getter = i => i.id === input.value;

      const found = records.find(getter);
      return {
        ...props,
        input: {
          ...input,
          value: _.get(found, 'fields.title', _.get(found, 'fields.name')),
          // set this up so we can clear
          onChange: () => {
            input.onChange('');
          },
        },
      };
    }),
    renderComponent(props => <TextInput {...props} opts={{ clear: true }} />),
  ),
  // mapProps(
  //   props => {
  //     const {input} = props;
  //     console.log('hello', 'hi')
  //     // onChange should turn back
  //     return {
  //       ...props,
  //       input: {
  //         ...input,
  //         onChange: e => input.onChange(e)
  //       }
  //     }

  //   }
  // )
);

export default compose(
  fetchAirtable,
  withSearchFilter,
  withSuggestionHandlers,
  withRenderers,
  maybeRenderChosenField,
)(ResourceSelector);

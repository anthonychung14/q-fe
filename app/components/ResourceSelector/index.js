/**
 * Form field to select a resource
 *
 * @format
 * @flow
 */

import _ from 'lodash';
import { fromJS } from 'immutable';
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

import { fetchAirtable, postResource } from './enhancers';

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
  searchedRecords,
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
    ({ input, unique }) => (input.value !== '' && unique ? input.value : ''),
  ),
  withHandlers({
    onChange: ({ setSearchTerm }) => event => {
      setSearchTerm(event.target.value);
    },
    onBlur: ({
      input: formInput,
      unique,
      searchTerm,
      createOnBlur,
      setLoading,
      resourceName,
    }) => async () => {
      if (unique) {
        formInput.onChange(searchTerm);
      }

      if (createOnBlur && !formInput.value && searchTerm) {
        const rest = resourceName === 'author' ? { charType: 'company' } : {};

        setLoading(true);
        const records = await postResource({
          resourceType: resourceName,
          values: fromJS({ name: searchTerm, ...rest }),
        });
        setLoading(false);

        formInput.onChange(_.get(_.first(records), 'id'));
      }
    },
  }),
  withProps(({ searchTerm, records }) => ({
    searchedRecords: records.search ? records.search(searchTerm) : records.list,
  })),
);

// TODO:
const withSuggestionHandlers = withHandlers({
  onSuggestionSelected: ({ input: formInput }) => (event, { suggestion }) => {
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

  // renderInputComponent: ({ renderHeader, label }) => inputProps => (
  //   <TextInputRef {...inputProps} renderHeader={renderHeader} label={label} />
  // ),
});

/** 
  Displays the input search term + stores the id in the form
*/
const maybeRenderChosenField = branch(
  props => props.input.value !== '' && !props.unique,
  compose(
    mapProps(props => {
      const { records, input } = props;
      const getter = i => i.id === input.value;

      const found = _.get(records, 'list', []).find(getter);
      return {
        ...props,
        input: {
          ...input,
          value: _.get(
            found,
            'fields.title',
            _.get(found, 'fields.name', _.get(found, 'fields.ingredient')),
          ),
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

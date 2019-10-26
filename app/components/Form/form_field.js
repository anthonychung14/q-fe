// @flow

import _ from 'lodash';
import * as React from 'react';
import validUrl from 'valid-url';

import { Field } from 'redux-form/immutable';
import Checkbox from 'components/Checkbox';
import TextAreaInput from 'components/TextAreaInput';
import TextInput from 'components/TextInput';
import ResourceSelector from 'components/ResourceSelector';
import MediaUpload from 'containers/MediaUpload';

const FormField = ({ renderHeader, field, form }: Props) => {
  const componentType = COMPONENT_TYPES[field.type];

  if (componentType == null) {
    throw new Error(`Unknown field type: ${field.type}`);
  }

  const fieldValidators = field.validate ? [...field.validate] : [];
  const componentValidators = componentType.validate
    ? [...componentType.validate]
    : [];

  if (field.required) {
    fieldValidators.push(required);
  }

  return (
    <Field
      component={componentType.component}
      format={componentType.format}
      key={field.name}
      name={field.name}
      parse={componentType.parse}
      props={{
        form,
        renderHeader,
        resourceType: field.resourceName,
        ...field,
      }}
      validate={[...fieldValidators, ...componentValidators]}
    />
  );
};

type Props = {
  field: Object,
  form: string,
  resource: Object,
};

const required = (value: boolean): ?string =>
  value !== undefined && value !== null && value.toString() !== ''
    ? undefined
    : 'Required';
const isUrl = (url: string): ?string =>
  _.isEmpty(url) || validUrl.isUri(url) ? undefined : 'Not a valid url';

const COMPONENT_TYPES = {
  number: {
    component: TextInput,
  },
  checkbox: {
    component: Checkbox,
  },
  integer: {
    component: TextInput,
    fullWidth: true,
    parse: value => _.toNumber(value.replace(/\D/g, '')), // strip non-numeric chars and parse into number
  },
  resource: { component: ResourceSelector },
  media: {component: MediaUpload},
  url: {
    component: TextInput,
    fullWidth: true,
    validate: [isUrl],
  },
  string: {
    component: TextInput,
    fullWidth: true,
  },
  textArea: {
    component: TextAreaInput,
    fullWidth: true,
  },
};

export default FormField;

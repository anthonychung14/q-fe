import React from 'react';
import { reduxForm } from 'redux-form';

import { WingBlank } from 'antd-mobile';

import { FIELDS } from './ExcerptForm';
import MoveForm from './MoveForm';
import TextSourceForm from './TextSourceForm';
import SequenceForm from './SequenceForm';
import StyleForm from './StyleForm';

const FormMap = activeForm => {
  const componentMap = {
    move: { tableName: 'combatMove', DynamicFormComponent: MoveForm },
    sequence: {
      tableName: 'combatSequence',
      DynamicFormComponent: SequenceForm,
    },
    style: { tableName: 'combatStyles', DynamicFormComponent: StyleForm },
    excerpt: { tableName: 'excerpt', DynamicFormComponent: TextSourceForm },
    source: { tableName: 'source', DynamicFormComponent: ExcerptForm },
  };

  const componentProps = componentMap[activeForm];
  const FormComponent = componentProps.DynamicFormComponent;
  const formName = componentProps.tableName;

  return <FormComponent form={formName} />;
};

export default class DynamicForm extends React.Component {
  componentWillMount() {
    const { activeForm } = this.props;
    this.Form = reduxForm({
      form: activeForm,
    })(FormMap(activeForm));
  }

  render() {
    const { Form } = this;
    const { activeForm } = this.props;
    return (
      <WingBlank size="md">
        <Form key={activeForm} {...this.props} activeForm={activeForm} />
      </WingBlank>
    );
  }
}

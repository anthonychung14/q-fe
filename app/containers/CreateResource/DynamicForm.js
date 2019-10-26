import React from 'react';
import { reduxForm } from 'redux-form';

import { WingBlank } from 'antd-mobile';

import {
  author,
  excerpt,
  foodItem,
  meal,
  measurement,
  textSource,
} from 'resources';
import MoveForm from './MoveForm';
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
    excerpt: { tableName: 'excerpt', DynamicFormComponent: excerpt },
    source: { tableName: 'source', DynamicFormComponent: textSource },
    meal: { tableName: 'meal', DynamicFormComponent: meal },
    foodItem: { tableName: 'foodItem', DynamicFormComponent: foodItem },
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

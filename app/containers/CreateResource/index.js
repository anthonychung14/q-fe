/**
 * Allows you to create a row in an arbitrary Airtable
 *
 * @flow
 * @format
 */

import * as React from 'react';

import { WingBlank, WhiteSpace } from 'antd-mobile';
import Form from 'components/Form';

import { withCreateResource } from 'components/ResourceSelector/enhancers';
// import actions from 'actions';
import resources from 'resources';

class ResourceCreatePage extends React.Component<Props> {
  submitCallback = values => {
    const { createResource, resourceType } = this.props;
    createResource(resourceType, values);
  };

  render() {
    const { resourceType } = this.props;

    const resource = resources[resourceType];
    return (
      <WingBlank size="lg">
        <WhiteSpace size="md" />
        <Form
          fields={resource.fields}
          form={resourceType}
          submitCallback={this.submitCallback}
          submitLabel="Create"
        />
      </WingBlank>
    );
  }
}

type Props = {
  fields: Array<Object>,
  resourceType: string,
  title: string,
};

export default withCreateResource(ResourceCreatePage);

/*
 * Report Incident
 *
 *
*/
import React from 'react';
import { compose } from 'recompose';

import { SegmentedControl } from 'antd-mobile';

import Container from 'components/Container';
// import TabBar from 'components/TabBar';

import { connectActiveSegmentProps } from 'selectors/skill_mode';
import { withSegmentState } from 'utils/enhancers';
import CreateResource from '../CreateResource';

const ReportIncidentComponent = ({
  activeForm,
  activeIndex,
  onChange,
  onValueChange,
  tintColor,
  values,
}) => {
  return (
    <Container>
      <SegmentedControl
        activeForm={activeForm}
        onChange={onChange}
        onValueChange={onValueChange}
        selectedIndex={activeIndex}
        values={values}
        tintColor={tintColor}
      />
      <CreateResource reportType="incident" resourceType={activeForm} />
    </Container>
  );
};

const Enhanced = compose(
  connectActiveSegmentProps,
  withSegmentState,
);

const ReportIncident = Enhanced(ReportIncidentComponent);

export default ReportIncident;

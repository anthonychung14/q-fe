import React from 'react';

import CreateResource from 'containers/CreateResource';

const SourceContentForm = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      border: '1px #30694B solid',
      marginLeft: '5%',
      padding: '2%',
    }}
  >
    <CreateResource resourceType="sourceContent" />
  </div>
);

export default SourceContentForm;

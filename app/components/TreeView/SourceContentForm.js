import React from 'react';
import _ from 'lodash';

import CreateResource from 'containers/CreateResource';
import MediaUpload from 'containers/MediaUpload';
import Checkbox from 'components/Checkbox';
import Container from 'components/Container';

const INPUT_TYPES = ['LINK', 'VISUAL'];

const ContentMediumCheckbox = ({ setActiveInput }) => {
  const onChange = React.useCallback(s => {
    setActiveInput(s);
  }, []);

  return (
    <div>
      <Checkbox
        values={INPUT_TYPES}
        input={{ onChange }}
        name="medium"
        horizontal
      />
    </div>
  );
};

const SourceContentForm = ({ parentId, resourceType }) => {
  const resource = _.camelCase(resourceType);
  const [activeInput, setActiveInput] = React.useState(INPUT_TYPES[0]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px #30694B solid',
        marginLeft: '5%',
        padding: '2%',
      }}
    >
      <div>
        <ContentMediumCheckbox
          values={INPUT_TYPES}
          setActiveInput={setActiveInput}
        />
      </div>
      <Container padded>
        {activeInput === 'LINK' ? (
          <CreateResource resourceType={resource} parentId={parentId} />
        ) : (
          <MediaUpload
            contentMakerId={parentId}
            parentId={parentId}
            resourceType={resource}
          />
        )}
      </Container>
    </div>
  );
};

export default SourceContentForm;

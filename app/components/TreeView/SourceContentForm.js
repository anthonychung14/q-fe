import React from 'react';
import { useDispatch } from 'react-redux';

import CreateResource from 'containers/CreateResource';
import MediaUpload from 'containers/MediaUpload';
import Checkbox from 'components/Checkbox';
import Container from 'components/Container';
import Button from 'components/Button';

const MEDIUMS = ['LINK', 'VISUAL'];
const CATEGORIES = ['VIDEO', 'AUDIO', 'TEXT', 'IMAGE'];

const ContentMediumCheckbox = ({ setActiveInput }) => {
  const onChange = React.useCallback(s => {
    setActiveInput(s);
  }, []);

  return (
    <div>
      <Checkbox
        values={MEDIUMS}
        input={{ onChange }}
        name="medium"
        horizontal
      />
    </div>
  );
};

export const ContentMediumHeader = () => {
  const dispatch = useDispatch();

  const handleClick = React.useCallback(
    e => {
      dispatch({
        type: 'stuff',
        payload: e.target.value,
      });
    },
    [dispatch],
  );

  return (
    <Container
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      {CATEGORIES.map(i => (
        <div style={{ flex: '0 50%' }} key={i}>
          <Button text={i} handleClick={handleClick} />
        </div>
      ))}
    </Container>
  );
};

const SourceContentForm = ({ parentId }) => {
  const [activeInput, setActiveInput] = React.useState(MEDIUMS[0]);

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
          values={MEDIUMS}
          setActiveInput={setActiveInput}
        />
      </div>
      <Container padded>
        {activeInput === 'LINK' ? (
          <CreateResource resourceType="sourceContent" parentId={parentId} />
        ) : (
          <MediaUpload />
        )}
      </Container>
    </div>
  );
};

export default SourceContentForm;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'components/Container';
import Button from 'components/Button';

// const MEDIUMS = ['LINK', 'VISUAL'];
// const LEVELS = ['author', 'sourceContent', 'excerpt', 'sourceCard'];
// const CATEGORIES = ['VIDEO', 'AUDIO', 'TEXT', 'IMAGE'];
const LEVELS = ['contentMaker', 'sourceContent', 'excerpt', 'sourceCard'];
const HEADER_MAP = {
  [LEVELS[0]]: 'Makers',
  [LEVELS[1]]: 'Content',
};

const SimonHeader = ({ choices = LEVELS.slice(0, 2) }) => {
  const dispatch = useDispatch();
  const activeLevel = useSelector(state =>
    state.getIn(['skillMode', 'activeLevel']),
  );

  const handleClick = React.useCallback(
    i => {
      dispatch({
        type: 'mode/SET_ROOT_LEVEL',
        payload: {
          level: i,
        },
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
      {choices.map(i => (
        <div style={{ flex: '0 50%' }} key={i}>
          <Button
            text={HEADER_MAP[i]}
            handleClick={() => handleClick(i)}
            type={activeLevel === i ? 'selected' : 'primary'}
          />
        </div>
      ))}
    </Container>
  );
};

export default SimonHeader;

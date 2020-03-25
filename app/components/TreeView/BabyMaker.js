import React from 'react';

import Button from 'components/Button';
import FlexContainer, { Flex } from 'components/FlexContainer';

import ExcerptConfirm from './ExcerptConfirm';

function useMarkPosition() {
  const [position, setPosition] = React.useState(0);

  const markPosition = React.useCallback(
    seconds => {
      setPosition(seconds);
    },
    [setPosition],
  );

  return [position, markPosition];
}

const BabyMaker = ({
  contentId,
  seconds,
  seekTo,
  contentCategory,
  stopPlayback,
  url,
}) => {
  const [start, setStart] = useMarkPosition('start');
  const [end, setEnd] = useMarkPosition('end');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [excerptValues, setValues] = React.useState({});

  return (
    <div
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        display: 'flex',
      }}
    >
      <div
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          display: 'flex',
        }}
      >
        <FlexContainer row around>
          <h4>{start.toFixed(0)} sec</h4>
          <h4>{seconds.toFixed(0)} seconds</h4>
          <h4>{end.toFixed(0)} sec</h4>
        </FlexContainer>

        <FlexContainer row>
          <Flex>
            <Button
              handleClick={() => seekTo(seconds - 20 < 0 ? 0 : seconds - 20)}
              text="REW 20"
              type="outline"
            />
          </Flex>
          <Flex>
            <Button
              handleClick={() => seekTo(seconds - 5 < 0 ? 0 : seconds - 5)}
              text="REW 5"
              type="outline"
            />
          </Flex>
          <Flex>
            <Button
              handleClick={() => seekTo(seconds + 5)}
              text="FF 5"
              type="outline"
            />
          </Flex>
          <Flex>
            <Button
              handleClick={() => seekTo(seconds + 20)}
              text="FF 20"
              type="outline"
            />
          </Flex>
        </FlexContainer>
        <FlexContainer row>
          <Flex>
            <Button handleClick={() => setStart(seconds)} text="Set Start" />
          </Flex>
          <Flex>
            <Button handleClick={() => setEnd(seconds)} text="Set End" />
          </Flex>
        </FlexContainer>
      </div>
      <Flex style={{ paddingTop: '4%' }}>
        <Button
          text="Make Excerpt"
          disabled={start === 0 || start > end}
          handleClick={e => {
            e.stopPropagation();
            setValues({
              startPosition: start,
              endPosition: end,
              contentId,
              contentCategory,
              url,
            });
            stopPlayback();
            setModalVisible(!modalVisible);
          }}
          type={start === 0 || start > end ? 'outline' : 'selected'}
        />
      </Flex>
      <ExcerptConfirm
        excerptValues={excerptValues}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </div>
  );
};

export default BabyMaker;

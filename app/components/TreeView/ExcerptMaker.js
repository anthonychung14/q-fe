import React from 'react';

import Button from 'components/Button';
import FlexContainer from 'components/FlexContainer';

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

const ExcerptMaker = ({ contentId, seconds, seekTo, contentCategory, url }) => {
  const [start, setStart] = useMarkPosition('start');
  const [end, setEnd] = useMarkPosition('end');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [excerptValues, setValues] = React.useState({});

  return (
    <div>
      <div
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          display: 'flex',
        }}
      >
        <FlexContainer>
          <h4>{start.toFixed(2)} sec</h4>
          <FlexContainer>
            <Button
              handleClick={() => seekTo(start)}
              text="Go Start"
              type="outline"
            />
            <Button handleClick={() => setStart(seconds)} text="Set Start" />
          </FlexContainer>
        </FlexContainer>
        <FlexContainer>
          <h4>{seconds.toFixed(2)} seconds</h4>
          <FlexContainer row>
            <FlexContainer>
              <Button
                handleClick={() => seekTo(seconds - 5 < 0 ? 0 : seconds - 5)}
                text="REW 5"
                type="outline"
              />
              <Button
                handleClick={() => seekTo(seconds - 20 < 0 ? 0 : seconds - 20)}
                text="REW 20"
                type="outline"
              />
            </FlexContainer>
            <FlexContainer>
              <Button
                handleClick={() => seekTo(seconds + 5)}
                text="FF 5"
                type="outline"
              />
              <Button
                handleClick={() => seekTo(seconds + 20)}
                text="FF 20"
                type="outline"
              />
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer>
          <h4>{end.toFixed(2)} sec</h4>

          <FlexContainer>
            <Button
              handleClick={() => seekTo(end)}
              text="Go End"
              type="outline"
            />
            <Button handleClick={() => setEnd(seconds)} text="Set End" />
          </FlexContainer>
        </FlexContainer>
      </div>
      <Button
        text="Make Excerpt"
        handleClick={() => {
          setValues({
            startPosition: start,
            endPosition: end,
            contentId,
            contentCategory,
            url,
          });
          setModalVisible(!modalVisible);
        }}
      />
      <ExcerptConfirm
        excerptValues={excerptValues}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </div>
  );
};

export default ExcerptMaker;

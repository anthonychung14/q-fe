import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Toast } from 'antd-mobile';

import Button from 'components/Button';
import TextInput from 'components/TextInput';
import FlexContainer, { Flex } from 'components/FlexContainer';

import { fetchGiphy } from 'utils/api';
import { getRootLevel } from 'selectors/skill_mode';
import { getChild } from 'gql/types';
import { withCreateExcerpt } from 'gql/mutations';

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

function useFormValuesForLevel(
  rootLevel,
  { contentId, contentCategory, contentMedium, url, stopPlayback, mutate },
  toCreate,
) {
  const [formValues, setValues] = React.useState({});
  const [modalVisible, setModalVisible] = React.useState(false);
  const [gif, setGif] = React.useState({});
  const dispatch = useDispatch();

  const [start, setStart] = useMarkPosition('start');
  const [end, setEnd] = useMarkPosition('end');
  const [titleInput, setTitleInput] = React.useState('');

  React.useEffect(() => {
    const getGiphy = async () => {
      const data = await fetchGiphy();
      setGif(data.image_url);
    };
    getGiphy();
  }, []);

  const handleMakeMediaClick = React.useCallback(
    e => {
      e.stopPropagation();

      if (rootLevel === 'sourceContent' && toCreate === 'sourceCard') {
        // sets values since we bring up a
        setValues({
          title: titleInput,
          contentId,
          contentCategory,
          contentMedium,
          url,
          gifUrl: gif,
        });
        setModalVisible(!modalVisible);
      } else {
        Toast.loading('Creating...', 1);
        mutate({
          variables: {
            startPosition: start,
            endPosition: end,
            contentId,
            contentCategory,
            contentMedium,
            url,
            gifUrl: gif,
          },
        }).then(i => {
          dispatch({
            type: 'mode/SET_MEDIA_DRAWER',
            payload: {
              drawer: contentId,
            },
          });
        });
      }
      stopPlayback();
    },
    [
      contentCategory,
      contentId,
      end,
      gif,
      modalVisible,
      rootLevel,
      setModalVisible,
      start,
      stopPlayback,
      titleInput,
      toCreate,
      url,
    ],
  );

  return [
    formValues,
    { start, setStart, end, setEnd, setTitleInput, titleInput },
    { modalVisible, setModalVisible },
    handleMakeMediaClick,
  ];
}

const MakeMediaButton = ({ toCreate, ...props }) => {
  return (
    <FlexContainer center style={{ padding: '4%' }}>
      <Button text={`Make ${_.startCase(toCreate)}`} {...props} />
    </FlexContainer>
  );
};

const UserMediaMaker = props => {
  const { __typename } = props;
  const toCreate = getChild(__typename);
  const rootLevel = useSelector(getRootLevel);
  const [
    formValues,
    localState,
    modalState,
    handleMakeMediaClick,
  ] = useFormValuesForLevel(rootLevel, props, toCreate);

  let buttonProps = {};
  const { start, end, titleInput } = localState;
  if (toCreate === 'sourceCard') {
    buttonProps = {
      disabled: !titleInput,
      type: titleInput ? 'selected' : 'outline',
    };
  } else if (rootLevel === 'sourceContent' || __typename === 'SourceContent') {
    buttonProps = {
      disabled: start === 0 || start > end,
      type: start === 0 || start > end ? 'outline' : 'selected',
    };
  }

  return (
    <FlexContainer>
      <MediaInputControl
        {...props}
        {...localState}
        formValues={formValues}
        toCreate={toCreate}
      />
      <MakeMediaButton
        {...buttonProps}
        handleClick={handleMakeMediaClick}
        toCreate={toCreate}
      />
      <ExcerptConfirm
        excerptValues={formValues}
        toCreate={toCreate}
        {...modalState}
        {...localState}
      />
    </FlexContainer>
  );
};

const MediaInputControl = ({
  seconds,
  seekTo,
  start,
  setStart,
  setEnd,
  end,
  toCreate,
  setTitleInput,
}) => {
  if (toCreate === 'sourceCard') {
    return (
      <FlexContainer>
        <TextInput
          input={{
            onChange: a => {
              setTitleInput(a);
            },
          }}
          label="Title"
        />
      </FlexContainer>
    );
  }

  return (
    <FlexContainer>
      <FlexContainer>
        <FlexContainer row around>
          <h4>Start: {start.toFixed(0)} sec</h4>
          <h4>At: {seconds.toFixed(0)} seconds</h4>
          <h4>End: {end.toFixed(0)} sec</h4>
        </FlexContainer>

        <FlexContainer row>
          <Flex>
            <Button
              handleClick={() => seekTo(seconds - 20 < 0 ? 0 : seconds - 20)}
              text="REW 20"
            />
          </Flex>
          <Flex>
            <Button
              handleClick={() => seekTo(seconds - 5 < 0 ? 0 : seconds - 5)}
              text="REW 5"
            />
          </Flex>
          <Flex>
            <Button handleClick={() => seekTo(seconds + 5)} text="FF 5" />
          </Flex>
          <Flex>
            <Button handleClick={() => seekTo(seconds + 20)} text="FF 20" />
          </Flex>
        </FlexContainer>
        <FlexContainer row>
          <Flex>
            <Button
              handleClick={() => setStart(seconds)}
              text="Set Start"
              type="selected"
            />
          </Flex>
          <Flex>
            <Button
              handleClick={() => setEnd(seconds)}
              text="Set End"
              type="selected"
            />
          </Flex>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
};

export default withCreateExcerpt(UserMediaMaker);

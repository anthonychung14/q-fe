import React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

import Button from 'components/Button';

import MediaPlayer from './MediaPlayer';

const withMutate = graphql(gql`
  mutation CreateExcerptForContent(
    $startPosition: Int!
    $endPosition: Int!
    $contentId: ID!
  ) {
    createExcerpt(
      startPosition: $startPosition
      endPosition: $endPosition
      contentId: $contentId
    ) {
      ok
    }
  }
`);

const ExcerptConfirm = ({
  modalVisible,
  excerptValues,
  setModalVisible,
  mutate,
}) => {
  if (!excerptValues.contentId) return null;

  return (
    <Rodal
      visible={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
      closeMaskOnClick={false}
      animation="slideUp"
      height={500}
    >
      <h3>Creating excerpt for {excerptValues.contentId}</h3>
      <MediaPlayer {...excerptValues} type="excerpt" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <h4>{excerptValues.startPosition} Start</h4>
        <h4>{excerptValues.endPosition} End</h4>
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Button
          handleClick={() => setModalVisible(false)}
          text="Cancel"
          type="outline"
        />
        <Button
          handleClick={() => {
            mutate({ variables: excerptValues });
            setModalVisible(false);
          }}
          text="Create Excerpt"
        />
      </div>
    </Rodal>
  );
};

export default withMutate(ExcerptConfirm);

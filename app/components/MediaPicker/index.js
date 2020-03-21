import React, { Component } from 'react';

import { WingBlank, WhiteSpace } from 'antd-mobile';
import Button from 'components/Button';
// import urls from 'constants/urls';

const displayNoneStyle = { display: 'none' };
/**
 *
 */
// const upload = urls.UPLOADS;

const genericFileInput = document.createElement('input');
genericFileInput.type = 'file';

class MediaPicker extends Component {
  inputRef = null;

  openFileUploader = event => {
    if (this.inputRef !== null && this.inputRef !== undefined) {
      this.inputRef.click();
    }
    if (this.props.handleClick) {
      this.props.handleClick(event);
    }
  };

  handleUpload = (event: Object) => {
    const { mediaType, uploadMedia, firebase } = this.props;
    const { target } = event;
    if (target.files) {
      uploadMedia(target.files, { mediaType, firebase });
    }
  };

  setInputRef = (ref: ?HTMLElement) => {
    this.inputRef = ref;
  };

  render() {
    return (
      <fieldset disabled={this.props.processing}>
        <WingBlank size="md">
          <h3>Media</h3>
          <Button
            text="Upload Picture"
            type="submit"
            icon="check"
            handleClick={this.openFileUploader}
          />
        </WingBlank>
        <form method="post" encType="multipart/form-data">
          <input
            type="file"
            name="filedata"
            ref={this.setInputRef}
            onChange={this.handleUpload}
            style={displayNoneStyle}
          />

          <WhiteSpace size="lg" />
        </form>
      </fieldset>
    );
  }
}

export default MediaPicker;

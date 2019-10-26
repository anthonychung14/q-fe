const maxSize = 209715200; // 200mb
const maxSizeVideo = 31457280; // 30mb

module.exports = {
  maxAllowableSizes: {
    maxSize,
    maxSizeVideo,
  },
  steps: {
    ':original': {
      robot: '/upload/handle',
    },
    resized: {
      use: ':original',
      robot: '/image/resize',
      result: true,
      height: 500,
      imagemagick_stack: 'v2.0.3',
      resize_strategy: 'fit',
      width: 500,
      zoom: false,
    },
    qualitied40: {
      use: 'resized',
      robot: '/image/resize',
      result: true,
      imagemagick_stack: 'v2.0.3',
      quality: 40,
    },
    qualitied92: {
      use: 'resized',
      robot: '/image/resize',
      result: true,
      imagemagick_stack: 'v2.0.3',
      quality: 90,
    },
    exported: {
      use: ['resized', 'qualitied40', 'qualitied92', ':original'],
      robot: '/s3/store',
      credentials: 'q_s3_credentials',
    },
  },
};

/*
 * USAGE:
 *    echo `\
 *   TRANSLOADIT_KEY="<key>" \
 *   TRANSLOADIT_SECRET="<secret>" \
 *   TRANSLOADIT_S3_KEY="<key>" \
 *   TRANSLOADIT_S3_SECRET="<s3_secret> \
 *   TRANSLOADIT_S3_BUCKET="<s3_bucket> \
 *   TRANSLOADIT_S3_BUCKET_REGION="<s3_bucket_region>" \
 *   npm run -s transloadit`
 *
 *   # stdout --> template_id
*/

const asyncL = require('async');
const Transloadit = require('transloadit');

const transloadit = new Transloadit({
  authKey: 'c14ee646f7c84ac49dd4f07d71bd10dc',
  authSecret: '16b853009484d44f5a109689c331203917e1205d',
});

// const IS_PROD = process.env.Q_ENV === 'PROD';
const template = require('../../app/utils/transloaditTemplate');

const templates = [
  {
    id: '00510db9151742a0925606de8e31aa7f',
    name: 'Q_FILE_UPLOAD',
    string: JSON.stringify(template),
  },
];

asyncL.map(
  templates,
  (item, done) => {
    transloadit.editTemplate(
      item.id,
      {
        name: item.name,
        template: item.string,
      },
      (err, result) => {
        if (err) return done(err);
        done(null, result);
      },
    );
  },
  (err, results) => {
    if (err) {
      process.exit(1);
    }
    results.forEach((r, i) => {
      if (i === 0) {
        process.stdout.write(r.id);
      }
    });
    process.exit(0);
  },
);

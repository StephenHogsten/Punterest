const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const pinSchema = mongoose.Schema({
  "img_url": {
    type: String,
    required: true
  },
  "uploader": {
    type: String,
    required: true
  },
  "likes": [String]
});

pinSchema.index({
  uploader: 1,
  img_url: 1
}, {
  unique: true
});

module.exports = mongoose.model('pin_pins', pinSchema);
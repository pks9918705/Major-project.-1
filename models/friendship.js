// Importing mongoose
const mongoose = require('mongoose');

const friendShipSchema = new mongoose.Schema(
  {
    // User who sent the request
    from_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    to_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Friendship = mongoose.model('Friendship', friendShipSchema);
module.exports = Friendship;

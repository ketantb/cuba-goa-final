const mongoose = require("mongoose");
const Schema = mongoose.Schema


const cartSchema = {
  userId: {
    type: mongoose.Types.ObjectId,
  },
  items: [
    {
      hotelId: mongoose.Types.ObjectId,
      checkInDate: {
        type: Date,
      },
      checkOutDate: {
        type: Date,
      },
      numberOfRooms: {
        type: Number,
      },
    },
  ],
  totalPrice: {
    type: Number,
  },
  client: {
    type: Schema.Types.ObjectId
  }
};

module.exports = mongoose.model("cart", cartSchema);

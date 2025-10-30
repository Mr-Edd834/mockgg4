const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  displayName: {
    type: String,
    trim: true
  },
  photoURL: {
    type: String,
    trim: true
  },
  provider: {
    type: String,
    enum: ['email', 'google'],
    default: 'email'
  },
  favorites: [{
    productId: {
      type: String,
      required: true
    },
    name: String,
    image: String,
    price: Number,
    category: String,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  orderHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ uid: 1 });

module.exports = mongoose.model('User', userSchema);


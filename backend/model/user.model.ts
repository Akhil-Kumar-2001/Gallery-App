import mongoose, { Document, Schema } from 'mongoose';

// User interface
export interface IUser extends Document {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  cacheCode?: string;
  cacheCodeExpires?: Date;
}

// User schema
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cacheCode: {
    type: String,
    default: null
  },
  cacheCodeExpires: {
    type: Date,
    default: null
  }
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);

export default User;
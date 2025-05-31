export interface IUser {
  username?: string;
  email: string;
  phoneNumber?: string;
  password: string;
}

export interface IImage {
  _id: string;
  userId: string;
  title: string;
  imagePath: string;
  uploadedAt: string;
  order: number;
}

export interface ImageFormData {
  title: string;
  image: File;
}


export interface IImageOrder {
  _id:string,
  order:number
}



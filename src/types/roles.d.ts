import { StaticImageData } from 'next/image';

interface ITemName {
  image: string;
  details: { title: string; rating: number };
}

export interface IVendorData {
  itemName: ITemName;
  description: string;
  properties: string;
  price: string;
  inventory: number;
  discount: number;
}
export interface IRiderData {
  itemName: { image: string; title: string };
  packageSize: string;
  properties: string;
  vendorName: string;
  vendorLocation: string;
  recieverLocation: string;
}
export interface IUser {
  id?: number | string;
  firstName?: string;
  lastName?: string;
  location: string;
  email: string;
  password?: string;
  role: string;
  path: string;
  username: string;
  img?: StaticImageData;
}

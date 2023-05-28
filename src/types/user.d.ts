import { User } from '@prisma/client';

export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export interface AuthUser {
  address: null | string;
  city: string;
  createdAt: string;
  email: string;
  emailToken: string;
  emailVerified: boolean;
  firstName: null | string;
  id: string;
  image: null | string;
  lastName: null | string;
  name: null | string;
  password: null;
  phoneNumber: string | null;
  state: string;
  updatedAt: string;
  userName: string;
  userType: string;
}

export type SafeReservation = Omit<
  Reservation,
  'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'>;

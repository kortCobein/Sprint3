export interface UserName {
  firstname: string;
  lastname: string;
}

export interface GeoLocation {
  lat: string;
  long: string;
}

export interface UserAddress {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: GeoLocation;
}

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: UserName;
  address: UserAddress;
  phone: string;
}
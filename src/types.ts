export interface ILogin {
  access_token: string;
  createdAt: string;
  email: string;
  id: string;
  updatedAt: string;
  username: string;
}

export interface ILoginSlice {
  user: ILogin;
}

export interface IUser {
  username: string;
  id: string;
  email: string;
}

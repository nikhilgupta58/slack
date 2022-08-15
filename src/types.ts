export interface ILoginSlice {
  user: { email: string; username: string; accesstoken: string };
}

export interface ILogin {
  accesstoken: string;
  email: string;
  username: string;
}

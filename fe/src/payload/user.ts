export interface Profile {
  id: string;
  name: string;
  email: string;
  studentNumber: string;
  picture: string;
  token?: string;
}

export interface User {
  profile: Profile;
}

export interface GetUserPayload extends User { }

export interface PostUserPayload extends User { };
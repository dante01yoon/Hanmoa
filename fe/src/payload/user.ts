export interface Profile {
  profile: {
    id: string;
    name: string;
    email: string;
    studentNumber: string;
    picture: number;
    token?: string;
  }
}
export interface UserPayload {
  profile: {
    id: string;
    name: string;
    email: string;
    studentNumber: string;
    picture: number;
    token?: string;
  }
}
import { ApiResponseInterface } from "../api/ApiResponseInterface";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface UserApiResponseInterface extends ApiResponseInterface {
  data: {
    user: UserInterface | null;
    token?: string | null;
  };
}

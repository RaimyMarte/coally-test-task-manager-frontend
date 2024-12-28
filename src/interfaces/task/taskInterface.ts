import { ApiResponseInterface } from "../api/ApiResponseInterface";

export interface TaskInterface {
  title: string;
  description: string | null;
  completed: boolean;
  owner: string;
  createdAt: Date;
}

export interface TaskApiResponseInterface extends ApiResponseInterface {
  data: TaskInterface[];
}

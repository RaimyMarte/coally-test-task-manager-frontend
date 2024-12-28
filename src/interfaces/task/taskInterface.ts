import { ApiResponseInterface } from "../api/ApiResponseInterface";

export interface TaskInterface {
  completed: boolean;
  createdAt: Date;
  description: string | null;
  id: string;
  owner: string;
  title: string;
}

export interface TaskApiResponseInterface extends ApiResponseInterface {
  data: TaskInterface[];
}

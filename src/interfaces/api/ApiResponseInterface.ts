import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface ApiResponseInterface {
    data: any;
    isSuccess: boolean;
    message: string;
    statusCode: number;
    title: string;
}

export type ApiMutationResponse = {
    data: ApiResponseInterface;
} | {
    error: FetchBaseQueryError | SerializedError;
}
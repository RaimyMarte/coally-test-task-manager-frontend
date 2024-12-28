import { ApiMutationResponse, ApiResponseInterface } from "../interfaces";

export const isMutationSuccessResponse = (response: ApiMutationResponse): response is { data: ApiResponseInterface } => {
    return (response as { data: ApiResponseInterface }).data !== undefined;
}
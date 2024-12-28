import Cookies from 'js-cookie';
import { ApiResponseInterface, UserApiResponseInterface } from '@/interfaces';
import { api } from '../api';
import { getHeaders } from '@/utils';

export interface LoginBody {
    email: string;
    password: string;
}

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserApiResponseInterface, LoginBody>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response: UserApiResponseInterface) => {
                if (response.data?.token) {
                    const newToken: string = response.data?.token;
                    Cookies.set('token', newToken, { expires: 30 });
                }

                return response;
            },
            invalidatesTags: ['user'],
        }),

        logout: builder.mutation<ApiResponseInterface, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                headers: getHeaders(),
            }),
            invalidatesTags: ['user'],
        }),

        checkAuth: builder.query<UserApiResponseInterface, void>({
            query: () => ({
                url: '/auth/check_auth',
                headers: getHeaders(),
            }),
            providesTags: ['user'],
        }),

    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useCheckAuthQuery,
} = authApi;

import Cookies from 'js-cookie';
import { ApiResponseInterface, UserApiResponseInterface } from '@/interfaces';
import { api } from '../api';
import { getHeaders } from '@/utils';

export interface LoginBody {
    email: string;
    password: string;
}

export interface SignUpBody {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
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
            invalidatesTags: ['user', 'tasks'],
        }),

        signUp: builder.mutation<ApiResponseInterface, SignUpBody>({
            query: (body) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body,
                headers: getHeaders(),
            }),
        }),

        logout: builder.mutation<ApiResponseInterface, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                headers: getHeaders(),
            }),
            transformResponse: (response: ApiResponseInterface) => {
                if (response?.isSuccess) {
                    Cookies.remove('token')
                }

                return response;
            },
            invalidatesTags: ['user', 'tasks'],
        }),

        checkAuth: builder.query<UserApiResponseInterface, void>({
            query: () => ({
                url: '/auth/check-auth',
                headers: getHeaders(),
            }),
            providesTags: ['user', 'tasks'],
        }),

    }),
});

export const {
    useLoginMutation,
    useSignUpMutation,
    useLogoutMutation,
    useCheckAuthQuery,
} = authApi;

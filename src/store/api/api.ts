import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APIKey: string = import.meta.env.VITE_APIKEY || ''
const APIBaseUrl: string = import.meta.env.VITE_API_BASE_URL || ''


export const api = createApi({
  reducerPath: "api",
  tagTypes: [],

  baseQuery: fetchBaseQuery({
    baseUrl: APIBaseUrl,
    prepareHeaders: (headers) => {
      headers.set('APIKey', `${APIKey}`)

      return headers
    },
  }),

  endpoints: () => ({

  }),
});
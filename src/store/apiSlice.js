import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (init) => ({
        url: "/users/signup",
        method: "POST",
        body: init,
      }),
    }),
    getProducts: builder.query({
      query: (init) => ({
        url: "/products",
        method: "GET",
        params: {
          limit: init.limit,
          sort: init.sort,
        },
      }),
    }),
  }),
});

export const { useGetProductsQuery, useSignupMutation } = apiSlice;

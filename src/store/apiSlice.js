import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenCookie, getAuthHeader } from "utils/tools";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token;
    const token = getTokenCookie();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["products"],

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (init) => ({
        url: "/users/signup",
        method: "POST",
        body: init,
      }),
    }),
    signin: builder.mutation({
      query: (init) => ({
        url: "/users/signin",
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
    getAuth: builder.query({
      query: () => ({
        url: "/users/isauth",
        method: "GET",
        // getAuthHeader,
      }),
    }),
    updateProfile: builder.mutation({
      query: (init) => ({
        url: "/users/updateMe",
        method: "PATCH",
        body: init,
        // getAuthHeader,
      }),
    }),
    updatePassword: builder.mutation({
      query: (init) => ({
        url: "/users/updateMyPassword",
        method: "PATCH",
        body: init,
      }),
    }),
    paginateProduct: builder.mutation({
      query: (init) => ({
        url: "/products/paginate/all",
        method: "POST",
        body: init,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["products"],
    }),
    getBrands: builder.query({
      query: () => ({
        url: `/brands`,
        method: "GET",
      }),
      // invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSignupMutation,
  useSigninMutation,
  useGetAuthQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  usePaginateProductMutation,
  useDeleteProductMutation,
  useGetBrandsQuery,
} = apiSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const propertyService = createApi({
  reducerPath: 'properties',
  tagTypes: ['properties'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.authReducer?.adminToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createProperty: builder.mutation({
      query: (FormData) => ({
        url: 'admin/new-property',
        method: 'POST',
        body: FormData,
      }),
      invalidatesTags: ['properties'],
    }),
    getProperties: builder.query({
      query: (page) => ({
        url: `properties?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['properties'],
    }),
    getProperty: builder.query({
      query: (id) => ({
        url: `properties/${id}`,
        method: 'GET',
      }),
      providesTags: ['properties'],
    }),
    updateProperty: builder.mutation({
      query: (data) => ({
        url: 'properties/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['properties'],
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `properties/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['properties'],
    }),
  }),
});

export const { 
  useCreatePropertyMutation, 
  useGetPropertyQuery, 
  useGetPropertiesQuery,
  useUpdatePropertyMutation, 
  useDeletePropertyMutation 
} = propertyService;

export default propertyService;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const propertyService = createApi({
  reducerPath: 'propertyService',
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
      query: (formData) => ({
        url: 'admin/new-property',
        method: 'POST',
        body: formData,
      }),
      // Optionally add invalidation if required
      // invalidatesTags: ['Property'],
    }),
    getProperties: builder.query({
      query: () => ({
        url: 'admin/properties',
        method: 'GET',
      }),
      // Optionally add tags for invalidation
      // providesTags: ['Property'],
    }),
    getProperty: builder.query({
      query: (id) => ({
        url: `all-property/${id}`,
        method: 'GET',
      }),
      providesTags: ['Property']
    }),
    
    updateProperty: builder.mutation({
      query: ({id,data }) => ({
        url: `admin/properties/edit/${id}`,
        method: 'PUT',
        body: JSON.stringify(data),
      }),
      // Optionally add invalidation if required
      // invalidatesTags: ['Property'],
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `admin/properties/delete/${id}`,
        method: 'DELETE',
      }),
      // Optionally add invalidation if required
      // invalidatesTags: ['Property'],
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

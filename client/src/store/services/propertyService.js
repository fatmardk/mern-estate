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
      // Invalidates the cache when creating a new property
    }),
    getProperties: builder.query({
      query: () =>({ 
        url:'admin/properties',
        method:'GET',
      })
      
    }),
    getProperty: builder.query({
      query: (id) => `properties/${id}`,
    }),
    updateProperty: builder.mutation({
      query: (data) => ({
        url: 'properties/update',
        method: 'PUT',
        body: data,
      }),
      // Invalidates the cache when updating a property
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `admin/properties/delete/${id}`,
        method: 'DELETE',
      }),
      // Invalidates the cache when deleting a property
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

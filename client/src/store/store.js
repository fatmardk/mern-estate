import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService";
import authReducer from "./reducers/authReducer";
import propertyService from "./services/propertyService";
import globalReducer from "./reducers/globalReducer";

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [propertyService.reducerPath]:propertyService.reducer,
    authReducer,
    globalReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authService.middleware,
      propertyService.middleware,
    ),
});

export default store;

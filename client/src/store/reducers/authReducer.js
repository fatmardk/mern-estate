import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode'; // Doğru içe aktarma

function verifyToken(keyName) {
  const storage = localStorage.getItem(keyName);
  if (storage) {
    try {
      const decodedToken = jwtDecode(storage);
      const expiresIn = new Date(decodedToken.exp * 1000);

      if (new Date() > expiresIn) {
        localStorage.removeItem(keyName);
        return null;
      } else {
        return storage;
      }
    } catch (error) {
      localStorage.removeItem(keyName);
      return null;
    }
  } else {
    return null;
  }
}

const authReducer = createSlice({
  name: 'authReducer',
  initialState: {
    adminToken: verifyToken('admin-token'),
    userToken: verifyToken('token'),
    user: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null,
  },
  reducers: {
    setAdminToken: (state, action) => {
      state.adminToken = action.payload;
      localStorage.setItem('admin-token', action.payload); // Token'ı kaydet
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      state.user = jwtDecode(action.payload);
      localStorage.setItem('userToken', action.payload); // Token'ı kaydet
    },
    logout: (state, { payload }) => {
      localStorage.removeItem(payload);
      if (payload === 'admin-token') {
        state.adminToken = null;
      } else if (payload === 'userToken') {
        state.userToken = null;
        state.user = null;
      }
    }
  },
});

export const { setAdminToken, setUserToken, logout } = authReducer.actions;
export default authReducer.reducer;

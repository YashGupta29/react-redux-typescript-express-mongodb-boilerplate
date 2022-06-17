import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// api
import authApi from "../../store/auth/authApi";

// interface
interface User {
  id: string;
  email: string;
  mobile?: number | string;
  name: string;
  isEmailVerified: boolean;
  mobileVerified?: boolean;
  username?: string;
}

interface authState {
  loggedIn: boolean;
  user: User | unknown | null;
}

const initialState: authState = {
  loggedIn: false,
  user: null,
};

// extra reducers
export const loginUserWithEmailAndPassword = createAsyncThunk(
  "auth/loginWithEmailAndPassword",
  async (payload: any, thunkApi) => {
    const res = await authApi.loginWithEmailAndPassword(payload);
    if (res.isSuccessful) {
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.error);
    }
  }
);

export const registerUserWithEmailAndPassword = createAsyncThunk(
  "auth/registerWithEmailAndPassword",
  async (payload: any, thunkApi) => {
    const res = await authApi.registerWithEmailAndPassword(payload);
    if (res.isSuccessful) {
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.error);
    }
  }
);

export const authenticateToken = createAsyncThunk(
  "auth/authenticateToken",
  async (_, thunkApi) => {
    const res = await authApi.authenticateToken();
    if (res.isSuccessful) {
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (payload: any, thunkApi) => {
    const res = await authApi.forgotPassword(payload);
    if (res.isSuccessful) {
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload: any, thunkApi) => {
    const res = await authApi.resetPassword(payload);
    if (res.isSuccessful) {
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    authApi.logout();
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.loggedIn = action.payload.loggedIn;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(["Method Name"].fulfilled, (state, action) => {});
    builder.addCase(
      loginUserWithEmailAndPassword.fulfilled,
      (state, action) => {
        state.user = action.payload;
        state.loggedIn = true;
      }
    );
    builder.addCase(loginUserWithEmailAndPassword.rejected, (state, action) => {
      state.user = null;
      state.loggedIn = false;
    });
    builder.addCase(
      registerUserWithEmailAndPassword.fulfilled,
      (state, action) => {
        state.user = action.payload;
        state.loggedIn = true;
      }
    );
    builder.addCase(
      registerUserWithEmailAndPassword.rejected,
      (state, action) => {
        state.user = null;
        state.loggedIn = false;
      }
    );
    builder.addCase(authenticateToken.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    });
    builder.addCase(authenticateToken.rejected, (state, action) => {
      state.user = null;
      state.loggedIn = false;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {});
    builder.addCase(forgotPassword.rejected, (state, action) => {});
    builder.addCase(resetPassword.fulfilled, (state, action) => {});
    builder.addCase(resetPassword.rejected, (state, action) => {});
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.user = null;
      state.loggedIn = false;
    });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

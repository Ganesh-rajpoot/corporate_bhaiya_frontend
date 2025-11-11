// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { User } from "../../types/User";

// interface AuthState {
//   user: User | null;
//   access: string | null;
//   refresh: string | null;
//   isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//    access: null,
//   refresh: null,
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login(state, action: PayloadAction<User>) {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },
//     logout(state) {
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;




// FIX @2

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login(
//       state,
//       action: PayloadAction<{ user: User; access: string; refresh: string }>
//     ) {
//       state.user = action.payload.user;
//       state.access = action.payload.access;
//       state.refresh = action.payload.refresh;
//       state.isAuthenticated = true;
//     },
//     logout(state) {
//       state.user = null;
//       state.access = null;
//       state.refresh = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem("auth");
//     },
//     rehydrate(state) {
//       const saved = localStorage.getItem("auth");
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         state.user = parsed.user;
//         state.access = parsed.access;
//         state.refresh = parsed.refresh;
//         state.isAuthenticated = true;
//       }
//     },
//   },
// });

// export const { login, logout, rehydrate } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

// Auth state
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

// Load from localStorage on app init
const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedToken,
  token: savedToken || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;

      // persist to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

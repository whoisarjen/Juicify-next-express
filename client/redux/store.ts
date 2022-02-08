import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/token.slice";
import configReducer from "./features/config.slice";
import onlineReducer from "./features/online.slice";
import keyReducer from "./features/key.slice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    config: configReducer,
    online: onlineReducer,
    key: keyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

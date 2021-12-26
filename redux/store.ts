import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/tokenSlice";
import configReducer from "./features/configSlice";
import onlineReducer from "./features/onlineSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    config: configReducer,
    online: onlineReducer,
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

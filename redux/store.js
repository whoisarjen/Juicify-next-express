import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/tokenSlice";
import configReducer from "./features/configSlice";
import onlineReducer from "./features/onlineSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    config: configReducer,
    online: onlineReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

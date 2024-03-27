import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import lecturerSlice from "./lecturer/lecturerSlice";

const perstConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  lecturer: lecturerSlice,
});

const persistedReducer = persistReducer(perstConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

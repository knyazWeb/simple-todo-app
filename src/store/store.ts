import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import tasksSlice from "./reducers/tasksSlice";


const rootReducer = combineReducers({
  tasks: tasksSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store =  configureStore({
  reducer: persistedReducer
})


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
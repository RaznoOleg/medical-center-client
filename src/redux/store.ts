import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import persistStore from 'redux-persist/es/persistStore';
import { authApi } from './services/authApi';
import userReducer from './features/slices/userSlice';
import navigationReducer from './features/slices/navigationSlice';
import authReducer from './features/slices/authSlice';
import sessionStorage from 'redux-persist/es/storage/session';
import { userApi } from './services/userApi';
import { patientApi } from './services/patientApi';
import { availabilityApi } from './services/availabilityApi';
import { appointmentApi } from './services/appointmentApi';
import { noteApi } from './services/noteApi';

const persistConfig = {
  key: 'medical-center',
  storage: sessionStorage,
  whitelist: ['accessToken']
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [patientApi.reducerPath]: patientApi.reducer,
  [availabilityApi.reducerPath]: availabilityApi.reducer,
  [appointmentApi.reducerPath]: appointmentApi.reducer,
  [noteApi.reducerPath]: noteApi.reducer,
  user: userReducer,
  navigation: navigationReducer,
  auth: persistReducer(persistConfig, authReducer)
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat([
      authApi.middleware,
      userApi.middleware,
      patientApi.middleware,
      availabilityApi.middleware,
      appointmentApi.middleware,
      noteApi.middleware
    ])
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

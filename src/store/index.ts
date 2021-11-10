import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import applicationReducer from './application/application.slice';

const rootReducer = combineReducers({
    application: applicationReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

// Construct mock store for tests
export const configureMockStore = (initialState?: object) =>
    configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
    });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type RootActions = Parameters<typeof applicationReducer>[1];

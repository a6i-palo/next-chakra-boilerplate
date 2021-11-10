import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IApplicationState {
    counter: number;
}

export const initialState: IApplicationState = {
    counter: 0,
};

interface ICounterPayload {
    counter: number;
}

const slice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        incrementCounter: (state) => {
            state.counter += 1;
        },
        decrementCounter: (state) => {
            state.counter > 0 ? (state.counter -= 1) : (state.counter = 0);
        },
        setCounter: (state, action: PayloadAction<ICounterPayload>) => {
            state.counter = action.payload.counter;
        },
    },
});

export const {incrementCounter, decrementCounter, setCounter} = slice.actions;

export default slice.reducer;

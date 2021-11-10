import {configureMockStore} from '~/store';
import {incrementCounter, decrementCounter, setCounter} from './application.slice';

describe('Application Reducer', () => {
    const initialState = {
        counter: 0,
    };

    const mockStore = configureMockStore({application: initialState});

    const appSlice = () => mockStore.getState().application;

    test('should deincrement counter on dispatch of incrementCounter', () => {
        expect(appSlice()).toMatchObject(initialState);
        mockStore.dispatch(incrementCounter());
        expect(appSlice().counter).toBe(1);
    });

    test('should decrement counter on dispatch of decrementCounter', () => {
        expect(appSlice()).toMatchObject({counter: 1});
        mockStore.dispatch(decrementCounter());
        expect(appSlice().counter).toBe(0);
    });

    test('should set counter to on dispatch of decrementCounter when counter is already 0', () => {
        expect(appSlice()).toMatchObject(initialState);
        mockStore.dispatch(decrementCounter());
        expect(appSlice().counter).toBe(0);
    });

    test('should set counter on dispatch of setCounter', () => {
        expect(appSlice()).toMatchObject(initialState);
        mockStore.dispatch(setCounter({counter: 22}));
        expect(appSlice().counter).toBe(22);
    });
});

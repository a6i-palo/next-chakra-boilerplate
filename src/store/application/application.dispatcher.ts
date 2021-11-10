import {Dispatch} from 'react';
import {setCounter} from './application.slice';
import {RootActions} from '~/store';

export const dispatchCounter = (counter: number) => (dispatch: Dispatch<RootActions>) =>
    dispatch({type: setCounter.type, payload: {counter}});

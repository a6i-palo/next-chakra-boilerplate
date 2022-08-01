import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '~/store';
import {Counter} from './Counter';

describe('Counter Component', () => {
    const mockState = {
        application: {
            counter: 5,
        },
    };

    const mockStore = configureMockStore(mockState);

    beforeEach(() => {
        render(
            <Provider store={mockStore}>
                <Counter />/
            </Provider>,
        );
    });

    test('should mount component with mock redux state', () => {
        expect(screen.getByRole('spinbutton', {name: 'counter value'})).toHaveAttribute('value', '5');
    });

    test('should increment counter input value by 1 on click of + button', () => {
        fireEvent.click(screen.getByText('+'));
        expect(screen.getByRole('spinbutton', {name: 'counter value'})).toHaveAttribute('value', '6');
    });

    test('should decrement counter input value by 1 on click of - button', () => {
        fireEvent.click(screen.getByText('-'));
        expect(screen.getByRole('spinbutton', {name: 'counter value'})).toHaveAttribute('value', '5');
    });

    test('should set custom value on click of set button', () => {
        const customInputNode = screen.getByRole('spinbutton', {name: 'custom counter value'});
        fireEvent.change(customInputNode, {target: {value: '38'}});
        fireEvent.click(screen.getByText('Set'));
        expect(screen.getByRole('spinbutton', {name: 'counter value'})).toHaveAttribute('value', '38');
    });
});

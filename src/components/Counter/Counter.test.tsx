import React from 'react';
import {Provider} from 'react-redux';
import {mount, ReactWrapper} from 'enzyme';
import {configureMockStore} from '~/store';
import {NumberInput, Button} from '@chakra-ui/react';
import {Counter} from './Counter';

describe('Counter Component', () => {
    let component: ReactWrapper;

    const mockState = {
        application: {
            counter: 5,
        },
    };

    const mockStore = configureMockStore(mockState);

    beforeEach(() => {
        component = mount(
            <Provider store={mockStore}>
                <Counter />/
            </Provider>,
        );
    });

    test('should mount component with mock redux state', () => {
        const numberInputs = component.find(NumberInput);
        const counterInput = numberInputs.at(0);

        expect(counterInput.props().value).toBe(5);
    });

    test('should increment counter input value by 1 on click of + button', () => {
        const buttons = component.find(Button);
        const plusBtn = buttons.filterWhere((btn) => btn.text() === '+');

        plusBtn.simulate('click');

        const numberInputs = component.find(NumberInput);
        const counterInput = numberInputs.at(0);

        expect(counterInput.props().value).toBe(6);
    });

    test('should decrement counter input value by 1 on click of - button', () => {
        const buttons = component.find(Button);
        const minusBtn = buttons.filterWhere((btn) => btn.text() === '-');

        minusBtn.simulate('click');

        const numberInputs = component.find(NumberInput);
        const counterInput = numberInputs.at(0);

        expect(counterInput.props().value).toBe(5);
    });

    test('should set custom value on click of set button', () => {
        const buttons = component.find(Button);
        const setBtn = buttons.filterWhere((btn) => btn.text() === 'Set');
        const numberInputs = component.find(NumberInput);
        const customInput = numberInputs.at(1).find('input');

        customInput.simulate('change', {target: {value: '38'}});

        setBtn.simulate('click');

        expect(component.find(NumberInput).at(0).props().value).toBe(38);
    });
});

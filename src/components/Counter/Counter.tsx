import React, {useState} from 'react';
import {Box, HStack, NumberInput, NumberInputField, Button} from '@chakra-ui/react';
import {useAppSelector, useAppDispatch} from '~/hooks/redux';
import {incrementCounter, decrementCounter, setCounter} from '~/store/application/application.slice';

export const Counter = () => {
    const [customCounter, setCustomCounter] = useState<number | undefined>();
    const dispatch = useAppDispatch();
    const {counter} = useAppSelector((state) => state.application);

    const incrementCounterHandler = () => {
        dispatch(incrementCounter());
    };

    const decrementCounterHandler = () => {
        dispatch(decrementCounter());
    };

    const setCounterHandler = () => {
        if (customCounter) dispatch(setCounter({counter: customCounter}));
    };

    const setCustomCounterHandler = (value: string) => {
        setCustomCounter(parseInt(value));
    };

    return (
        <>
            <HStack>
                <NumberInput value={counter}>
                    <NumberInputField />
                </NumberInput>
                <Button onClick={decrementCounterHandler}>-</Button>
                <Button onClick={incrementCounterHandler}>+</Button>
            </HStack>
            <Box>
                <HStack>
                    <NumberInput precision={0} min={0} defaultValue={customCounter} onChange={setCustomCounterHandler}>
                        <NumberInputField placeholder="Custom Counter Value" />
                    </NumberInput>
                    <Button onClick={setCounterHandler} minW="90px">
                        Set
                    </Button>
                </HStack>
            </Box>
        </>
    );
};

import React from 'react';
import type {NextPage} from 'next';
import {Box, Flex, VStack} from '@chakra-ui/react';
import {Counter} from '~/components/Counter/Counter';

const CounterPage: NextPage = () => {
    return (
        <Flex direction="column" minH="100vh">
            <Box m="auto">
                <VStack m="16px">
                    <Counter />
                </VStack>
            </Box>
        </Flex>
    );
};

export default CounterPage;

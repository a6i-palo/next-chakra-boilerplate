import React from 'react';
import {Flex, Box} from '@chakra-ui/react';
import {Gists} from '~/components/Gists/Gists';

const GistsPage = () => {
    return (
        <Flex direction="column">
            <Box m="16px" w="100%">
                <Gists />
            </Box>
        </Flex>
    );
};

export default GistsPage;

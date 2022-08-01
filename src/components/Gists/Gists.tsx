import {useAppSWR} from '~/hooks/swr';
import {Box, Link} from '@chakra-ui/react';

export interface IGist {
    html_url: string;
    description?: string;
    id: number;
}

export const Gists = () => {
    const {data, error} = useAppSWR('https://api.github.com/gists');

    return !error ? (
        <>
            {data
                ? data.map((gist: IGist) => (
                      <Box key={gist.id} textAlign="left" w="100%">
                          <Link href={gist.html_url} isExternal>
                              {gist.description || '---'}
                          </Link>
                      </Box>
                  ))
                : '...Loading Gists'}
        </>
    ) : (
        <Box>An error occurred while fetching the data</Box>
    );
};

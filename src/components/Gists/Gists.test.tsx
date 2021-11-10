import React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import {act} from 'react-dom/test-utils';
import {Link} from '@chakra-ui/react';
import {SWRConfig} from 'swr';
import {Gists, IGist} from './Gists';

describe('Gists Component', () => {
    const _global = global as any;
    let component: ReactWrapper;

    const mockGists: IGist[] = [
        {
            id: 1,
            html_url: 'http://example1.com',
            description: 'foobar',
        },
        {
            id: 2,
            html_url: 'http://example2.com',
            description: 'baxz',
        },
    ];

    describe('error loading gists', () => {
        beforeAll(() => {
            jest.spyOn(_global, 'fetch').mockImplementationOnce(() => Promise.reject(new Error()));
        });

        test('should mount component with error', async () => {
            component = mount(<Gists />);

            expect(component.text()).toBe('...Loading Gists');

            await act(async () => {
                component.update();
            });

            expect(_global.fetch).toHaveBeenCalledTimes(1);
            expect(_global.fetch).toHaveBeenCalledWith('https://api.github.com/gists');
            _global.fetch.mockClear();

            act(() => {
                component.update();
            });

            expect(component.text()).toBe('An error occurred while fetching the data');
        });
    });

    describe('load gists successfully', () => {
        beforeAll(() => {
            const mockJsonPromise = Promise.resolve(mockGists);
            const mockFetchPromise = Promise.resolve({
                ok: true,
                json: () => mockJsonPromise,
            });
            jest.spyOn(_global, 'fetch').mockImplementationOnce(() => mockFetchPromise);
        });

        test('should mount component with loading text', async () => {
            // SWR cache should be reseted in between tests
            // https://swr.vercel.app/docs/advanced/cache#reset-cache-between-test-cases
            component = mount(
                <SWRConfig value={{provider: () => new Map()}}>
                    <Gists />
                </SWRConfig>,
            );

            expect(component.text()).toBe('...Loading Gists');

            await act(async () => {
                component.update();
            });

            expect(_global.fetch).toHaveBeenCalledTimes(1);
            expect(_global.fetch).toHaveBeenCalledWith('https://api.github.com/gists');
            _global.fetch.mockClear();
        });

        test('should mount component with loaded data', () => {
            act(() => {
                component.update();
            });
            const links = component.find(Link);
            expect(links.length).toBe(2);

            links.forEach((link, i) => {
                expect(link.text()).toBe(mockGists[i].description);
                expect(link.props().href).toBe(mockGists[i].html_url);
            });
        });
    });
});

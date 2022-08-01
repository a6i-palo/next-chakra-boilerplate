import {Gists, IGist} from './Gists';
import {act} from 'react-dom/test-utils';
import {render, screen} from '@testing-library/react';

describe('Gists Component', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _global = global as any;

    const mockGists: IGist[] = [
        {
            id: 1,
            html_url: 'http://example1.com',
            description: 'foobar',
        },
        {
            id: 2,
            html_url: 'http://example2.com',
            description: 'bazx',
        },
        {
            id: 3,
            html_url: 'http://example3.com',
        },
    ];

    describe('error loading gists', () => {
        beforeAll(() => {
            jest.spyOn(_global, 'fetch').mockImplementationOnce(() => Promise.reject(new Error()));
        });

        beforeEach(async () => {
            await act(() => {
                render(<Gists />);
            });
        });

        test('should display error message after calling api', async () => {
            act(() => {
                expect(_global.fetch).toHaveBeenCalledTimes(1);
                expect(_global.fetch).toHaveBeenCalledWith('https://api.github.com/gists');
            });

            expect(screen.getByText('An error occurred while fetching the data')).toBeInTheDocument();
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

        beforeEach(async () => {
            await act(() => {
                render(<Gists />);
            });
        });

        test('should load data after calling api', async () => {
            act(() => {
                expect(_global.fetch).toHaveBeenCalledTimes(1);
                expect(_global.fetch).toHaveBeenCalledWith('https://api.github.com/gists');
            });

            const links = screen.getAllByRole('link');
            links.forEach((link, i) => {
                expect(link).toHaveAttribute('href', mockGists[i].html_url);
            });
        });
    });
});

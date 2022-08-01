import React from 'react';
import '@testing-library/jest-dom'
import 'whatwg-fetch';

global.React = React;

afterEach(() => {
    jest.clearAllMocks();
});

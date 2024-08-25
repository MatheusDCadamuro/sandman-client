import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('Jest', () => {
    it('should run tests', () => {
        expect(true).toBe(true);
    })

    it('should display the correct text', () => {
        render(<BrowserRouter>
            <App />
        </BrowserRouter>);
    })
});


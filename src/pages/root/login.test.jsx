import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";

describe("Login", () => {
    it('should render page', () => {
        render(<BrowserRouter>
            <Login />
        </BrowserRouter>);
          })
    it('should enable button', () => {
        render(<BrowserRouter>
            <Login />
        </BrowserRouter>);
        const button = screen.getByRole('button');
        expect(button).toBeEnabled();
    })
    it('should get cdenf', () => {
        render(<BrowserRouter>
            <Login />
        </BrowserRouter>);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    })
});
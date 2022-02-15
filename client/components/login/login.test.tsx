import { render, screen, waitFor } from '@testing-library/react'
import { store } from "../../redux/store"
import user from '@testing-library/user-event'
import Login from '../../pages/login';
import { Provider } from "react-redux";

describe('Testing login validation', () => {
    describe('Gave empty login', () => {
        test('Expect "should be at least 3 characters"', async () => {
            render(
                <Provider store={store}>
                    <Login />
                </Provider>
            )

            user.type(screen.getByLabelText(/login/i), '')
            user.click(screen.getByRole('button'))

            await waitFor(() => screen.getByText(/should be at least 3 characters/i))
        });
    });

    describe('Gave empty password', () => {
        test('Expect "should be at least 8 characters"', async () => {
            render(
                <Provider store={store}>
                    <Login />
                </Provider>
            )

            user.type(screen.getByLabelText(/password/i), '')
            user.click(screen.getByRole('button'))

            await waitFor(() => screen.getByText(/should be at least 8 characters/i))
        });
    });

    describe('Gave correct values', () => {
        test('Expect 0 errors', async () => {
            render(
                <Provider store={store}>
                    <Login />
                </Provider>
            )

            user.type(screen.getByLabelText(/login/i), '123')
            user.type(screen.getByLabelText(/password/i), '12345678')
            await waitFor(() => user.click(screen.getByRole('button')))

            expect(screen.queryByText(/should be at least 3 characters/i)).toBeNull();
            expect(screen.queryByText(/should be at least 8 characters/i)).toBeNull();
        });
    });
});

export default {}
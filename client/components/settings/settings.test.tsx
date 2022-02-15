import { render, screen, waitFor } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { Provider } from "react-redux";
import Settings from "../../pages/settings";
import { store } from "../../redux/store";
import { createMockRouter } from "../../test-utils/createMockRouter.test.utils";
import user from '@testing-library/user-event'

// const MockSettings = () => {
//     return (
//         <Provider store={store}>
//             <RouterContext.Provider value={createMockRouter({
//                 locale: 'en',
//                 locales: ['en', 'pl']
//             })}>
//                 <Settings />
//             </RouterContext.Provider>
//         </Provider>
//     )
// }

// const testInputs = ({ where, input, tryBadValue, getError, tryCorrectValue, getErrorNull }: any) => {
//     describe(`Gave not valid value to ${where}`, () => {
//         it('Should return error message', async () => {
//             render(<MockSettings />)
//             user.type(input(), tryBadValue)
//             await waitFor(() => user.click(screen.getByRole('button', {
//                 name: /submit/i
//             })))
//             await waitFor(() => getError())
//         })
//     })
//     describe(`Gave valid value to ${where}`, () => {
//         it('Should correctly fire submit function', async () => {
//             render(<MockSettings />)
//             user.type(input(), tryCorrectValue)
//             await waitFor(() => user.click(screen.getByRole('button', {
//                 name: /submit/i
//             })))
//             expect(getErrorNull()).toBeNull()
//         })
//     })
// }

// describe(`Testing properly working of settings's inputes`, () => {
//     testInputs({
//         where: 'meal number',
//         input: () => screen.getByLabelText(/number of meals/i),
//         tryBadValue: '1234',
//         getError: () => screen.getByText(/Value should be less than or equal to 10/i),
//         tryCorrectValue: '5',
//         getErrorNull: () => screen.queryByText(/Value should be less than or equal to 10/i),
//     })

//     testInputs({
//         where: 'Fiber',
//         input: () => screen.getByLabelText(/fiber/i),
//         tryBadValue: '1234',
//         getError: () => screen.getByText(/Value should be less than or equal to 100/i),
//         tryCorrectValue: '10',
//         getErrorNull: () => screen.queryByText(/Value should be less than or equal to 100/i),
//     })

//     testInputs({
//         where: 'Sugar',
//         input: () => screen.getByLabelText(/sugar/i),
//         tryBadValue: '1234',
//         getError: () => screen.getByText(/Value should be less than or equal to 100/i),
//         tryCorrectValue: '10',
//         getErrorNull: () => screen.queryByText(/Value should be less than or equal to 100/i),
//     })

//     testInputs({
//         where: 'Height',
//         input: () => screen.getByLabelText(/height/i),
//         tryBadValue: '1234',
//         getError: () => screen.getByText(/Value should be less than or equal to 250/i),
//         tryCorrectValue: '150',
//         getErrorNull: () => screen.queryByText(/Value should be less than or equal to 250/i),
//     })
// })

export default {};
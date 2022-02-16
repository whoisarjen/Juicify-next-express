import { render } from "@testing-library/react"
import { RouterContext } from "next/dist/shared/lib/router-context"
import { Provider } from "react-redux"
import { store } from "../../../redux/store"
import { createMockRouter } from "../../../test-utils/createMockRouter.test.utils"
import Barcode from './index'
import useBarcode from "./useBarcode"

const LoadBarcode = () => {
    const props = useBarcode()
    // handleSubmit = jest.spyOn(props, 'handleSubmit')
    return (
        <Barcode {...props} />
    )
}

const setup = () => {
    return render(
        <Provider store={store}>
            <RouterContext.Provider value={createMockRouter({
                locale: 'en',
                locales: ['en', 'pl']
            })}>
                <LoadBarcode />
            </RouterContext.Provider>
        </Provider>
    )
}
describe('Testing barcode correct loading', () => {
    setup()
})

export default {};
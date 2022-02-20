import { render } from "@testing-library/react"
import { RouterContext } from "next/dist/shared/lib/router-context"
import { Provider } from "react-redux"
import { store } from "../../../redux/store"
import { createMockRouter } from "../../../test-utils/createMockRouter.test.utils"
import BaseBarcode from "./Barcode"
import useBarcode from "./useBarcode"

const Component = () => {
    const props = useBarcode()
    // handleSubmit = jest.spyOn(props, 'handleSubmit')
    return <BaseBarcode {...props} />
}

const setup = () => {
    return render(
        <Provider store={store}>
            <RouterContext.Provider value={createMockRouter({
                locale: 'en',
                locales: ['en', 'pl']
            })}>
                {/* <Component /> */}
            </RouterContext.Provider>
        </Provider>
    )
}

it.todo('Testing barcode correct loading')

export default {};
import { render } from "@testing-library/react"
import { RouterContext } from "next/dist/shared/lib/router-context"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { createMockRouter } from "./createMockRouter.test.utils"

export const setupComponent = (Component: any, routerValuesAsObject: any) => {
    return render(
        <Provider store={store}>
            <RouterContext.Provider value={createMockRouter({
                locale: 'en',
                locales: ['en', 'pl'],
                ...(routerValuesAsObject && { routerValuesAsObject })
            })}>
                <Component />
            </RouterContext.Provider>
        </Provider>
    )
}
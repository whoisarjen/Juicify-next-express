import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useDailyMeasurement } from './useDailyMeasurement'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { store } from '../redux/store';
import { createMockRouter } from '../test-utils/createMockRouter.test.utils';
import { renderHook } from '@testing-library/react-hooks'

jest.mock('./useDailyMeasurement', async () => ({
    data: 'asdasdas'
}))

function setup() {
    const response = {}
    function TestHook() {
        Object.assign(response, useDailyMeasurement('2022-02-14', 'Arjen'))
        return null
    }
    render(
        <Provider store={store}>
            <RouterContext.Provider value={createMockRouter({
                query: {
                    login: 'Arjen',
                    date: new Date().toJSON().slice(0, 10),
                    id: '6209979b47c67e4bef844530'
                }
            })}>
                <TestHook />
            </RouterContext.Provider>
        </Provider>
    )
    return response
}

describe('Checking useDailyMeasurement responses', () => {
    it('', () => {
        

    })
})

export default {};
import { render, screen, waitFor } from '@testing-library/react';
import Component from '../pages/[login]/workout/results/[date]/[id]'
import { createMockRouter } from '../test-utils/createMockRouter.test.utils';
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { getDailyMeasurement, getUser, getWorkoutResult } from '../test-utils/fakeDate.test.utils';

jest.mock('../hooks/useWorkoutResult', async () => {
    return [{ data: await getWorkoutResult(), user: await getUser(), daily: await getDailyMeasurement(), }, () => jest.fn()]
})

describe('Testing correct loading for /workout/results/[date]/[id]', () => {
    it('', async () => {
        // const { result } = renderHook(() => useWorkoutResult());
        // console.log('result', result)

        render(
            <Provider store={store}>
                <RouterContext.Provider value={createMockRouter({
                    query: {
                        login: 'Arjen',
                        date: new Date().toJSON().slice(0, 10),
                        id: '6209979b47c67e4bef844530'
                    }
                })}>
                    <Component />
                </RouterContext.Provider>
            </Provider>
        )

        // await waitFor(() => screen.getByDisplayValue(/Preetka/i))
        // console.log(await getWorkoutResult())
        // const title = screen.getByRole('textbox', {
        //     name: /title/i
        // })

        // screen.getByRole('textbox', {
        //     name: /date/i
        // })
        // screen.getByRole('textbox', {
        //     name: /notes/i
        // })
    })
})

export default {};
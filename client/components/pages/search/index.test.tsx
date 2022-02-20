import { setupComponent } from "../../../test-utils/setupComponent.test.utils"
import BaseSearch from "./Search"
import { screen } from '@testing-library/react'
import { useRouter } from "next/router"
import userEvent from "@testing-library/user-event"

let push: any = null;

const Component = () => {
    const router = useRouter()
    push = jest.spyOn(router, 'push')
    const props = {
        router: router,
        isLoading: false,
        data: {
            items: [
                {
                    '_id': '123',
                    'login': 'Arjen',
                    'name': 'Kamil',
                    'surname': 'Owczarek'
                },
                {
                    '_id': '1234',
                    'login': 'test',
                    'name': 'Preetini',
                    'surname': 'Kuna'
                },
            ]
        }
    }

    // @ts-ignore
    return <BaseSearch {...props} />
}

beforeEach(() => {
    setupComponent(Component, { query: { find: 'Arjen' } })
})

describe(`Checking search page`, () => {
    describe('Putting array of users', () => {

        it('Expecting to show logins on screen', async () => {
            screen.getByText(/arjen/i)
            screen.getByText(/test/i)
        })

        it('Expecting to show names on screen', async () => {
            screen.getByText(/kamil/i)
            screen.getByText(/Preetini/i)
        })

        it('Expecting to show surnames on screen', async () => {
            screen.getByText(/owczarek/i)
            screen.getByText(/kuna/i)
        })

        it('expecting to call push after click on user', () => {
            const element = screen.getByText(/arjen/i)
            userEvent.click(element)
            expect(push).toBeCalledWith('/Arjen')
        })

        it.todo('useSearch')

    })
})

export default {};
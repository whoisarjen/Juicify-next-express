import { getUser } from "../../../../test-utils/fakeDate.test.utils";
import { setupComponent } from "../../../../test-utils/setupComponent.test.utils";
import BaseProfileNavbar from "./ProfileNavbar";
import useProfileNavbar from "./useProfileNavbar";
import { screen } from '@testing-library/react'

let fakeUser: any = null;

const Component = () => {
    const props = useProfileNavbar({
        tab: 0,
        user: fakeUser
    })

    return <BaseProfileNavbar {...props} />
}

beforeEach(async () => {
    fakeUser = await getUser()
    setupComponent(Component, {})
})

describe(`Testing Profile's navbar`, () => {
    describe('Expect to show received data', () => {

        it('login', async () => {
            screen.getByText(fakeUser.login)
        })

        it('describe', async () => {
            if (fakeUser.describe) {
                screen.getByText(fakeUser.describe)
            }
        })

        it('name and surname', async () => {
            screen.getByText(fakeUser.name + " " + fakeUser.surname)
        })

        it('facebook', () => {
            if (fakeUser.facebook) {
                screen.getByTestId('facebook')
            }
        })

        it('instagram', () => {
            if (fakeUser.instagram) {
                screen.getByTestId('instagram')
            }
        })

        it('twitter', () => {
            if (fakeUser.twitter) {
                screen.getByTestId('twitter')
            }
        })

        it('website', () => {
            if (fakeUser.website) {
                screen.getByTestId('website')
            }
        })

    })
})

export default {};
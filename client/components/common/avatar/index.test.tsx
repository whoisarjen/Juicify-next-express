import BaseAvatar from ".";
import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import { screen } from '@testing-library/react'

const originalEnv = process.env;

const user = {
    _id: '123112',
    login: 'Arjen',
    name: 'Kamil',
    surname: 'Owczarek'
}

const Component = () => {
    return <BaseAvatar {...{ user }} />
}

beforeEach(() => {
    setupComponent(Component)
})

describe('Testing avatar', () => {

    it('Expecting to show data in alt', async () => {
        screen.getByAltText(`${user.login} ${user.name} ${user.surname} on Juicify`)
    })

    it('Expecting to have correct src', () => {
        const logo: any = screen.getByAltText(`${user.login} ${user.name} ${user.surname} on Juicify`)

        expect(logo.src).toEqual(`${originalEnv.NEXT_PUBLIC_SERVER}/avatar/${user._id}.jpg`)
    })

})

export default {};
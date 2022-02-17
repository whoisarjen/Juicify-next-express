import { setupComponent } from '../../../../test-utils/setupComponent.test.utils'
import useWorkoutBox from './useWorkoutBox'
import BaseWorkoutBox from './WorkoutBox'
import { screen } from '@testing-library/react'

const component = () => {
    const props = useWorkoutBox({
        title: '123',
        description: '345',
        route: '/asdasdasas',
        type: 1,
        isNotSaved: false,
        whenAdded: '2020-12-12',
    })

    return <BaseWorkoutBox {...props} />
}

beforeEach(() => {
    setupComponent(component, {})
})

describe('Testing WorkoutBox', () => {
    it('Expecting to show revsed doted data', () => {
        screen.getByText(/12.12.2020/i)
    })

    it('Expecting to show title', () => {
        screen.getByText(/123/i)
    })

    it('Expecting to show description', () => {
        screen.getByText(/345/i)
    })

    it('Expecting to link', () => {
        screen.queryByRole('link', {
            name: /asdasdasas/i
        })
    })

    it.todo('useWorkoutBox')
})

export default {};
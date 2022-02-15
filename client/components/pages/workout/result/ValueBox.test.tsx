import { render, screen, waitFor } from "@testing-library/react"
import { ValueSchemaProps } from "../../../../schema/workoutResult.schema"
import ValuesContainerBox from "./ValueBox"
import user from '@testing-library/user-event'

interface renderLoggedDataProps {
    isOwner: boolean
    value: ValueSchemaProps
}

const renderLoggedData = ({ isOwner, value }: renderLoggedDataProps) => render(<ValuesContainerBox value={value} index={0} changeResult={(object) => object} deleteResult={() => console.log()} isOwner={isOwner} />)

describe('Checking ValuesContainerBox functionality', () => {
    describe(`Gave user's data`, () => {
        test('Expect to have locked data on screen', () => {
            renderLoggedData({ isOwner: true, value: { reps: 15, weight: 100 } })
            shouldSaveBeAvailable(true)
            shouldDeleteBeAvailable(true)
            shouldBeOpen(false)
        })
    })

    describe(`Gave guest's data`, () => {
        test('Expect to have locked limited data on screen', () => {
            renderLoggedData({ isOwner: false, value: { reps: 15, weight: 100 } })
            shouldSaveBeAvailable(false)
            shouldDeleteBeAvailable(false)
            shouldBeOpen(false)
        })
    })

    describe(`Gave user's data with open = true`, () => {
        test('Expect to have open data on screen', () => {
            renderLoggedData({ isOwner: true, value: { open: true, reps: 15, weight: 100 } })
            shouldSaveBeAvailable(true)
            shouldDeleteBeAvailable(false)
            shouldBeOpen(true)
        })
    })

    describe(`Gave guest's data with open = true`, () => {
        test('Expect to have locked limited data on screen', () => {
            renderLoggedData({ isOwner: false, value: { open: true, reps: 15, weight: 100 } })
            shouldSaveBeAvailable(false)
            shouldDeleteBeAvailable(false)
            shouldBeOpen(false)
        })
    })
})

function shouldDeleteBeAvailable(isActive: boolean) {
    if (isActive) {
        screen.getByRole('button', {
            name: /delete/i
        })
    } else {
        expect(screen.queryByRole('button', {
            name: /delete/i
        })).toBeNull()
    }
}

function shouldSaveBeAvailable(isActive: boolean) {
    if (isActive) {
        screen.getByRole('button', {
            name: /save/i
        })
    } else {
        expect(screen.queryByRole('button', {
            name: /save/i
        })).toBeNull()
    }
}

function shouldBeOpen(isActive: boolean) {
    if (isActive) {
        expect(screen.queryByText(/100kg/i)).toBeNull()
        expect(screen.queryByText(/15r./i)).toBeNull()
        const weight = screen.getByRole('textbox', {
            name: /weight/i
        })
        const reps = screen.getByRole('textbox', {
            name: /reps/i
        })
        screen.getByDisplayValue(/100/i)
        screen.getByDisplayValue(/15/i)
        user.type(weight, '1230')
        user.type(reps, '50')
        screen.getByDisplayValue(/1230/i)
        screen.getByDisplayValue(/50/i)
    } else {
        screen.getByText(/100kg/i)
        screen.getByText(/#1/i)
        screen.getByText(/15r./i)
        expect(screen.queryByRole('textbox', {
            name: /weight/i
        })).toBeNull()

        expect(screen.queryByRole('textbox', {
            name: /reps/i
        })).toBeNull()
    }
}

export default {}
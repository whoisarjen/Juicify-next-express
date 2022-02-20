import Stack from '@mui/material/Stack'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import useTranslation from 'next-translate/useTranslation'

interface DatePickerMobileProps {
    change: (arg0: any) => void,
    defaultDate: Date,
    marginBottom?: string | number,
    minDate?: Date
}

const DatePickerMobile = ({ change, defaultDate, marginBottom = 0, minDate }: DatePickerMobileProps) => {
    const { t } = useTranslation('home')
    const [value, setValue] = useState<Date>(defaultDate)

    const handleChange = (newValue: any) => {
        setValue(newValue)
        change(newValue)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} sx={{ marginBottom: marginBottom }}>
                <MobileDatePicker
                    label={t('PICK_DATE')}
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={minDate}
                />
            </Stack>
        </LocalizationProvider>
    )
}

export default DatePickerMobile
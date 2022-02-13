import Stack from '@mui/material/Stack'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

interface MobileDatePickerExportProps {
    change: (arg0: any) => void,
    defaultDate: Date,
    label?: string,
    marginBottom?: string | number
}

const MobileDatePickerExport = ({ change, defaultDate, label = "Pick date", marginBottom = 0 }: MobileDatePickerExportProps) => {
    const [value, setValue] = useState<Date>(defaultDate)

    const handleChange = (newValue: any) => {
        setValue(newValue)
        change(newValue)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} sx={{ marginBottom: marginBottom }}>
                <MobileDatePicker
                    label={label}
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    )
}

export default MobileDatePickerExport
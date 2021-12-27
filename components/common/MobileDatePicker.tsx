import Stack from '@mui/material/Stack'
import { useState, useEffect, FunctionComponent } from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

interface MobileDatePickerExportProps {
    change: (arg0: any) => void,
    defaultDate?: Date,
    label?: string,
    marginBottom?: string
}

const MobileDatePickerExport: FunctionComponent<MobileDatePickerExportProps> = ({ change, defaultDate = new Date(), label = "Pick date", marginBottom = 0 }) => {
    const [value, setValue] = useState<any>(defaultDate)

    const handleChange = (newValue) => {
        setValue(newValue)
        change(newValue)
    }

    useEffect(() => setValue(defaultDate), [defaultDate])

    return (
        <div className="mobileDatePicker">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3} sx={{marginBottom: marginBottom}}>
                    <MobileDatePicker
                        label={label}
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
        </div>
    )
}

export default MobileDatePickerExport
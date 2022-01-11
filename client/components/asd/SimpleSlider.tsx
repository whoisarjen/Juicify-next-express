import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import { FunctionComponent, useState, useEffect } from 'react';
import * as React from 'react';
import useTranslation from 'next-translate/useTranslation';

const Input = styled(MuiInput)`
  width: 42px;
`;

interface SimpleSliderProps {
    title: string,
    macro: Array<any>,
    beginValue: any,
    changed: (arg0: number) => void,
    day: number
}

const SimpleSlider: FunctionComponent<SimpleSliderProps> = ({ title, macro, beginValue, changed, day }) => {
    const [value, setValue] = useState<any>(false);
    const [timer, setTimer] = useState<any>(null)
    const [maxValue, setMaxValue] = useState(0)
    const { t } = useTranslation('macronutrients')

    useEffect(() => setValue(beginValue), [beginValue, day])

    useEffect(() => {
        const key = title.toLowerCase()
        let count = 0
        console.log('macro', macro)
        console.log('key', key)
        macro.forEach(x => {
            console.log(x)
            if(!x.locked || x.day == day){
                count += x[key]
                console.log('count', count)
            }
        })
        setMaxValue(count)
        if (value > count) {
            setValue(count)
        }
    }, [macro, day])

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setValue(newValue);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > maxValue) {
            setValue(maxValue);
        }
    };

    useEffect(() => {
        clearTimeout(timer)
        if (value !== false && value !== beginValue) {
            const changeFunction = (find: string) => setTimeout(async () => {
                changed(value)
            }, 500)
            setTimer(changeFunction(value))
        }
    }, [value])

    return (
        <Box sx={{ margin: 'auto 0' }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item sx={{ minWidth: 75, textAlign: 'center' }}>
                    {t(title.toUpperCase())}
                </Grid>
                <Grid item xs>
                    <Slider
                        value={value}
                        min={0}
                        max={maxValue}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            min: 0,
                            max: maxValue,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default SimpleSlider;
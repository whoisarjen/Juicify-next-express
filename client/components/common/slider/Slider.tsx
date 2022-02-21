import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useSliderProps } from './useSlider';

const Input = styled(MuiInput)`
    width: 42px;
`;

const BaseSlider = ({ title, value, maxValue, handleChange, handleInputChange, handleBlur, t }: useSliderProps) => {
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

export default BaseSlider;
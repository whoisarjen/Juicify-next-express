import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import styled from 'styled-components';
import { useValueBoxProps } from './useValueBox';
import ConfirmDialog from '../../../../common/confirmDialog';

const Box = styled.div`
    min-height: 36px;
    width: 100%;
    padding: 8px 0;
    margin-top: 12px;
    border-radius: 4px;
    border: 1px solid #eee;
    font-size: 0.875rem;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    ${this} div {
        margin: auto;
    }
`

const Connected = styled.div`
    grid-column: 1 / 3;
`

const BaseValueBox = ({ index, changeResult, isOwner, open, setOpen, weight, reps, setReps, deleteResult, weightOptions, loadWeight, repsOptions }: useValueBoxProps) => {
    return (
        <>
            {
                open && isOwner
                    ?
                    <>
                        <Box
                            onClick={() => {
                                setOpen(false)
                                changeResult({ reps: parseInt(reps), weight: parseFloat(weight), open })
                            }}
                        >
                            <Connected><div>Click to save</div></Connected>
                            <div><div>#{index + 1}</div></div>
                            <div>
                                <IconButton aria-label="arrow">
                                    <ArrowRightAltOutlinedIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton aria-label="save">
                                    <CircleOutlinedIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                            </div>
                        </Box>
                        <Autocomplete
                            sx={{ marginTop: '8px' }}
                            disablePortal
                            value={weight}
                            id="combo-box-demo"
                            options={weightOptions}
                            onChange={(e, value) => changeResult({ reps: parseInt(reps), weight: parseFloat((value || 0).toString()), open })}
                            onInputChange={(e, valueLocally) => loadWeight(valueLocally)}
                            getOptionLabel={(option) => option ? option.toString() : ""}
                            renderInput={(params) => <TextField {...params} label="Weight" />}
                        />
                        <Autocomplete
                            sx={{ marginTop: '8px' }}
                            disablePortal
                            value={reps}
                            id="combo-box-demo"
                            options={repsOptions}
                            onChange={(e, value) => changeResult({ reps: parseInt((value || 0).toString()), weight: parseFloat(weight), open })}
                            onInputChange={(e, valueLocally) => setReps(valueLocally)}
                            getOptionLabel={(option) => option ? option.toString() : ""}
                            renderInput={(params) => <TextField {...params} label="Reps" />}
                        />
                    </>
                    :
                    <>
                        <Box>
                            <div>
                                {
                                    isOwner &&
                                    <ConfirmDialog confirmed={deleteResult}>
                                        <IconButton aria-label="delete">
                                            <DeleteIcon sx={{ fontSize: 20 }} />
                                        </IconButton>
                                    </ConfirmDialog>
                                }
                            </div>
                            <div onClick={() => setOpen(true)}><div>{weight}kg</div></div>
                            <div onClick={() => setOpen(true)}><div>#{index + 1}</div></div>
                            <div onClick={() => setOpen(true)}><div>{reps}r.</div></div>
                            <div onClick={() => setOpen(true)}>
                                {
                                    isOwner &&
                                    <IconButton aria-label="save">
                                        <CheckCircleOutlinedIcon sx={{ fontSize: 20 }} />
                                    </IconButton>
                                }
                            </div>
                        </Box>
                    </>
            }
        </>
    );
}

export default BaseValueBox;
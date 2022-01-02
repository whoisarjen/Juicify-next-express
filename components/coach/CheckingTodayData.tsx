import { FunctionComponent, useState } from "react";
import Button from '@mui/material/Button';
import styles from '../../styles/coach.module.css'
import { useDailyMeasurement } from "../../hooks/useDailyMeasurement";
import { getAge, getShortDate } from "../../utils/manageDate";
import Weights from '../common/Weights'
import { useAppSelector } from "../../hooks/useRedux";

interface ChooseDietProps {
    setStep: (arg0: string) => void
}

const CheckingTodayData: FunctionComponent<ChooseDietProps> = ({ setStep }) => {
    const [{ data }, reload] = useDailyMeasurement(getShortDate())
    const [isWeights, setIsWeights] = useState(false)
    const token: any = useAppSelector(state => state.token.value)

    return (
        <div className={styles.checkingTodayData}>
            <div className={styles.AddWeightMainTitle}><div>Before we start</div></div>
            {
                data &&
                (
                    data.weight > 0
                        ?
                        <>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Height:</th>
                                        <td>{token.height}cm</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <th>Weight:</th>
                                        <td>{data.weight}kg</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <th>Age:</th>
                                        <td>{getAge(token.birth)}y</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>Please make sure the information are correct. Next steps will basic on them. The weight for today you can change directly in the page. The rest is available on settings page.</div>

                            <Button variant="contained" onClick={() => setIsWeights(true)}>Change weight</Button>
                        </>
                        :
                        <>
                            <div />
                            <div>Before we start, you have to put correct weight for today's date. It's important, because all calculation will basic on this data.</div>
                            <Button variant="contained" color="error" onClick={() => setIsWeights(true)}>Add weight</Button>
                        </>
                )
            }
            <Button variant="contained" onClick={() => setStep('ChooseDiet')} disabled={!data || data.weight == 0}>Everything is fine</Button>
            <Weights
                isWeights={isWeights}
                closeWeights={() => {
                    reload()
                    setIsWeights(false)
                }}
            />
        </div>
    )
}

export default CheckingTodayData;
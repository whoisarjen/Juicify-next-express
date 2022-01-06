import { FunctionComponent } from "react";
import SelectLanguage from '../common/SelectLanguage'

const Tab3: FunctionComponent<any> = ({ changeObject }) => {
    return (
        <div>
            <div style={{ marginBottom: '12px' }}>
                <SelectLanguage />
            </div>
        </div>
    )
}

export default Tab3;
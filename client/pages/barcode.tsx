import { FunctionComponent } from "react";
import { expectLoggedIN } from "../utils/checkAuth";
import React from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

const Barcode: FunctionComponent = () => {
    expectLoggedIN();
    const [data, setData] = React.useState('Not Found');

    return (
        <div className="barcode">
            <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={(err, result: any) => {
                    if (result) setData(result.text)
                    else setData('Not Found')
                }}
            />
            <p>{data}</p>
        </div>
    );
};

export default Barcode;

import { FunctionComponent } from "react";
// import React from 'react';
// import BarcodeScannerComponent from "react-webcam-barcode-scanner";

const Barcode: FunctionComponent = () => {
    // const [data, setData] = React.useState('Not Found');

    return (
        <div className="barcode">
            {/* <BarcodeScannerComponent
                width={726}
                height={408}
                onUpdate={(err, result: any) => {
                    if (result) setData(result.text)
                    else setData('Not Found')
                }}
            />
            <p>{data}</p> */}
        </div>
    );
};

export default Barcode;

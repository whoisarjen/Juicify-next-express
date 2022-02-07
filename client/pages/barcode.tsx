import React, { useEffect, useState } from 'react';
// @ts-ignore
import Quagga from 'quagga';

const App = (props: any) => {
    const [barcode, setBarcode] = useState('');

    const _onDetected = (res: any) => {
        setBarcode(res.codeResult.code);
    };

    useEffect(() => {
        Quagga.init(
            {
                inputStream: {
                    type: 'LiveStream',
                    target: document.querySelector('#scanner-container'),
                    constraints: {
                        facingMode: 'environment' // or user
                    }
                },
                numOfWorkers: navigator.hardwareConcurrency,
                locate: true,
                frequency: 1,
                debug: {
                    drawBoundingBox: true,
                    showFrequency: true,
                    drawScanline: true,
                    showPattern: true
                },
                multiple: false,
                locator: {
                    halfSample: false,
                    patchSize: 'large', // x-small, small, medium, large, x-large
                    debug: {
                        showCanvas: false,
                        showPatches: false,
                        showFoundPatches: false,
                        showSkeleton: false,
                        showLabels: false,
                        showPatchLabels: false,
                        showRemainingPatchLabels: false,
                        boxFromPatches: {
                            showTransformed: false,
                            showTransformedBox: false,
                            showBB: false
                        }
                    }
                },
                decoder: {
                    readers: [
                        'code_128_reader',
                        'ean_reader',
                        'ean_8_reader',
                        'code_39_reader',
                        'code_39_vin_reader',
                        'codabar_reader',
                        'upc_reader',
                        'upc_e_reader',
                        'i2of5_reader',
                        'i2of5_reader',
                        '2of5_reader',
                        'code_93_reader'
                    ]
                }
            },
            (err: any) => {
                if (err) {
                    return console.log(err);
                }
                Quagga.start();
            }
        );
        Quagga.onDetected(_onDetected);
        Quagga.onProcessed((result: any) => {
            let drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(
                        0,
                        0,
                        parseInt(drawingCanvas.getAttribute('width')),
                        parseInt(drawingCanvas.getAttribute('height'))
                    );
                    result.boxes.filter((box: any) => box !== result.box).forEach((box: any) => {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                            color: 'green',
                            lineWidth: 2
                        });
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                }
            }
        });
    })

    return (
        <div>
            <div id="scanner-container" />
            <span>Barcode: {barcode}</span>
        </div>
    )
}

export default App;
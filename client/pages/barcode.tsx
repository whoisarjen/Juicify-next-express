import React, { useEffect, useMemo, useState } from 'react';
// @ts-ignore
import Quagga from 'quagga';
import axios from 'axios';
import { getAllIndexedDB } from '../utils/indexedDB.utils';
import CreateProduct from '../components/nutrition-diary/CreateProduct';
import AddProductMoreInformation from '../components/nutrition-diary/AddProductInfo';
import { useDailyMeasurement } from '../hooks/useDailyMeasurement';
import { getShortDate } from '../utils/date.utils';
import { useAppSelector } from '../hooks/useRedux';
import styled from 'styled-components';

const Grid = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto auto;
    text-align: center;
    ${this} #scanner-container {
      position: relative;
      width: 100% !important;
    }
    ${this} #scanner-container video,
    ${this} #scanner-container canvas {
      width: 100% !important;
    }
    ${this} .drawingBuffer {
      position: absolute;
      left: 0;
      top: 0;
    }
`

const Barcode = () => {
    const [loadedBarcode, setLoadedBarcode] = useState(0)
    const [isCreateProduct, setIsCreateProduct] = useState(false)
    const [loadedProduct, setLoadedProduct] = useState<any>(false)
    const token: any = useAppSelector(state => state.token.value)
    const [{ data }] = useDailyMeasurement(getShortDate(), token.login)

    const _onDetected = async (res: any) => {
        try {
            setLoadedBarcode(res.codeResult.code)
            setIsCreateProduct(false)
            const products = await getAllIndexedDB('product')
            const product = products.filter((x: any) => x.code == res.codeResult.code)
            if (product.length) {
                const value = { ...product[0], code: res.codeResult.code }
                setLoadedProduct(value)
            } else {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/find/product`, { code: res.codeResult.code }, { withCredentials: true });
                if (response.data) {
                    const value = { ...response.data, code: res.codeResult.code }
                    setLoadedProduct(value)
                } else {
                    setIsCreateProduct(true)
                }
            }
        } catch (e: any) {
            console.log(e)
        }
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

        return () => {
            Quagga.stop()
        }
    }, [])

    const scanner = useMemo(() => <div id="scanner-container" />, [])

    return (
        <>
            <Grid>
                {scanner}
                <span>Scan barcode code</span>
            </Grid>
            <AddProductMoreInformation handleClose={() => setLoadedProduct(false)} loadedProduct={loadedProduct} dailyMeasurement={data} />
            {
                isCreateProduct &&
                <CreateProduct closeCreateProduct={() => setIsCreateProduct(false)} isCreateProduct={isCreateProduct} created={() => _onDetected(loadedBarcode)} defaultBarcode={loadedBarcode} />
            }
        </>
    )
}

export default Barcode;
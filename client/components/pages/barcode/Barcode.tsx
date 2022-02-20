import styled from "styled-components";
import Informations from "../nutrition-diary/box/addProducts/informations";
import CreateProduct from "../nutrition-diary/box/addProducts/create";
import { useBarcodeProps } from "./useBarcode";

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

const BaseBarcode = ({ loadedProduct, setLoadedProduct, data, isCreateProduct, setIsCreateProduct, loadedBarcode, _onDetected }: useBarcodeProps) => {
    return (
        <>
            <Grid>
                <div id="scanner-container" />,
                <span>Scan barcode code</span>
            </Grid>
            <Informations handleClose={() => setLoadedProduct(false)} loadedProduct={loadedProduct} dailyMeasurement={data} />
            {
                isCreateProduct &&
                <CreateProduct closeCreateProduct={() => setIsCreateProduct(false)} isCreateProduct={isCreateProduct} created={() => _onDetected(loadedBarcode)} defaultBarcode={loadedBarcode} />
            }
        </>
    )
}

export default BaseBarcode;
import styled from "styled-components";
import AddProductMoreInformation from "../nutrition-diary/AddProductInfo";
import CreateProduct from "../nutrition-diary/CreateProduct";

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

const Barcode = ({ loadedProduct, setLoadedProduct, data, isCreateProduct, setIsCreateProduct, loadedBarcode, _onDetected }: any) => {
    return (
        <>
            <Grid>
                <div id="scanner-container" />,
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
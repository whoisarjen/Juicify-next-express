import styled from "styled-components";
import DialogShowProductInformations from "../../common/dialog-show-product-informations";
import DialogCreateProduct from "../../common/dialog-create-product";
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

const BaseBarcode = ({ loadedProduct, setLoadedProduct, data, loadedBarcode, _onDetected }: useBarcodeProps) => {
  return (
    <>
      <Grid>
        <div id="scanner-container" />,
        <span>Scan barcode code</span>
      </Grid>
      <DialogShowProductInformations handleClose={() => setLoadedProduct(false)} loadedProduct={loadedProduct} dailyMeasurement={data} />
      {loadedBarcode > 0 && <DialogCreateProduct created={() => _onDetected(loadedBarcode)} defaultBarcode={loadedBarcode}><div /></DialogCreateProduct>}
    </>
  )
}

export default BaseBarcode;
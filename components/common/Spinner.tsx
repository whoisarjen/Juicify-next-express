import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FunctionComponent } from "react";

const Spinner: FunctionComponent = () => {
    return (
        <div className="spinner">
            <Loader
                type="ThreeDots"
                color="#1976d2"
                height={100}
                width={100}
            />
        </div>
    );
}

export default Spinner;
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FunctionComponent } from "react";
import { useTheme } from "../../hooks/useTheme";

const Spinner: FunctionComponent = () => {
    const [getTheme]: any = useTheme()

    return (
        <div className="spinner">
            <Loader
                type="ThreeDots"
                color={getTheme('PRIMARY')}
                height={100}
                width={100}
            />
        </div>
    );
}

export default Spinner;
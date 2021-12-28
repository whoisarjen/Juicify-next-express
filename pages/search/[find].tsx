import { FunctionComponent } from "react";
import SearchBox from "../../components/common/SearchBox";
import Spinner from "../../components/common/Spinner";

const Search: FunctionComponent = () => {
    return (
        <div className="search">
            <SearchBox />
            <Spinner />
        </div>
    );
};

export default Search;

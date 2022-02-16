import Search from "./search";
import useSearch from "./useSearch";

const SearchComponent = () => {
    const props = useSearch()

    return <Search {...props} />
};

export default SearchComponent;

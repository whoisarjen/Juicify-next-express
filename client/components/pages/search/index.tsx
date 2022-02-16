import BaseSearch from "./Search";
import useSearch from "./useSearch";

const Search = () => {
    const props = useSearch()

    return <BaseSearch {...props} />
};

export default Search;

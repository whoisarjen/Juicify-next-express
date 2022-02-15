import Search from "../../components/pages/search";
import useSearch from "../../components/pages/search/useSearch";

const SearchPage = () => {
    const props = useSearch()
    
    return <Search {...props} />
};

export default SearchPage;

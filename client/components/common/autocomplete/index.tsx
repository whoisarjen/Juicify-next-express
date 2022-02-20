import BaseAutocomplete from "./Autocomplete";
import useAutocomplete from "./useAutocomplete";

export interface AutocompleteProps {
    find: string | null,
    setFind: (arg0: string) => void,
    loading: boolean,
    searchCache: Array<string>
}

const Autocomplete = ({ find, setFind, loading, searchCache }: AutocompleteProps) => {
    const props = useAutocomplete({ find, setFind, loading, searchCache })

    return <BaseAutocomplete {...props} />
}

export default Autocomplete;
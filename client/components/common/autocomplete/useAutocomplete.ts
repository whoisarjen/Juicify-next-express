import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { AutocompleteProps } from "."

const useAutocomplete = ({ find, setFind, loading, searchCache }: AutocompleteProps) => {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)

    return { find, setFind, loading, searchCache, t, open, setOpen }
}

export type useAutocompleteProps = ReturnType<typeof useAutocomplete>

export default useAutocomplete;
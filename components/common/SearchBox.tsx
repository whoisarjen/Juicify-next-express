import { useRouter } from 'next/router'
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import IconButton from "@mui/material/IconButton"
import { FunctionComponent, useState } from "react"
import SearchIcon from "@mui/icons-material/Search"
import useTranslation from "next-translate/useTranslation"

const SearchBox: FunctionComponent = () => {
    const router = useRouter()
    const { t } = useTranslation("home");
    const [search, setSearch] = useState<string | null>()

    return (
        <Paper
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 350,
                boxShadow: 0,
                margin: 'auto',
                border: 1,
                borderColor: "#e4e4e4",
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={t("Search Something Awesome")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                inputProps={{ "aria-label": t("Search Something Awesome") }}
            />
            <IconButton type="submit" onClick={() => router.push(`/search/${search}`)} sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default SearchBox;
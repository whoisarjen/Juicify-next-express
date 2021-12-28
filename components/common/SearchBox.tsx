import { FunctionComponent } from "react";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import useTranslation from "next-translate/useTranslation";

const SearchBox: FunctionComponent = () => {
    const { t } = useTranslation("home");

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
                inputProps={{ "aria-label": t("Search Something Awesome") }}
            />
            <IconButton type="submit" onClick={() => console.log('submit')} sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default SearchBox;
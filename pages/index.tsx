import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { useCookies } from "react-cookie";
import { FunctionComponent } from "react";

const Home: FunctionComponent = () => {
  const router: any = useRouter();
  const { t } = useTranslation("home");
  const [, setCookie] = useCookies(["NEXT_LOCALE"]);

  const handleChange = (e: any) => {
    setCookie("NEXT_LOCALE", e.target.value, {
      path: "/",
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 20)),
    });
    router.push(router.asPath, router.asPath, { locale: e.target.value });
  };

  return (
    <div className="home">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t("Language")}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={router.locale}
          autoWidth
          onChange={(e) => handleChange(e)}
          label={t("Language")}
        >
          {router.locales.map((locale: any) => (
            <MenuItem key={locale} value={locale}>
              {locale}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Home;
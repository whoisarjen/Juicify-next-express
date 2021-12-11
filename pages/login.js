import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import connectAPI from "../api/connectAPI";
import Stack from "@mui/material/Stack";
import { useCookies } from "react-cookie";
import styles from "../styles/login.module.css";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/features/tokenSlice";
import useTranslation from "next-translate/useTranslation";
import { expectLoggedOUT, readToken } from "../hooks/useAuth";
import { getCurrentDate } from "../functional/changeDate";
import { createIndexedDB } from "../hooks/useIndexedDB";
import Image from 'next/image'
import logo from '../public/images/logo.png'

const Login = () => {
  expectLoggedOUT();
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies(["token"]);
  const requiredBasicInputLength = useSelector(
    (state) => state.config.requiredBasicInputLength
  );

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (
      requiredBasicInputLength(login).status &&
      requiredBasicInputLength(password).status
    ) {
      setLoading(true);
      const { response, status } = await connectAPI("/auth/login", {
        login,
        password,
      });
      if (status === "success") {
        setCookie("token", response.token, {
          path: "/",
          expires: new Date(
            new Date().setFullYear(new Date().getFullYear() + 20)
          ),
        });
        setCookie("refresh_token", response.refresh_token, {
          path: "/",
          expires: new Date(
            new Date().setFullYear(new Date().getFullYear() + 20)
          ),
        });
        dispatch(setToken(response.token));
        await createIndexedDB();
        router.push(
          `/${
            readToken(response.token).login
          }/nutrition-diary/${getCurrentDate()}`
        );
      }
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className={styles.loginBox}>
        <div className={styles.loginLogoBox}>
          <Image alt="Juicify.app"src={logo}/>
        </div>
        <div>
          <Stack direction="column" spacing={2}>
            <TextField
              value={login}
              variant="outlined"
              label={t("login:Login")}
              onKeyPress={handleKeyPress}
              onChange={(e) => setLogin(e.target.value)}
              error={
                login.length > 0 && !requiredBasicInputLength(login).status
              }
              helperText={
                login.length > 0 && !requiredBasicInputLength(login).status
                  ? t("home:requiredBasicInputLength")
                  : ""
              }
            />
            <TextField
              type="password"
              value={password}
              variant="outlined"
              label={t("login:Password")}
              onKeyPress={handleKeyPress}
              onChange={(e) => setPassword(e.target.value)}
              error={
                password.length > 0 &&
                !requiredBasicInputLength(password).status
              }
              helperText={
                password.length > 0 &&
                !requiredBasicInputLength(password).status
                  ? t("home:requiredBasicInputLength")
                  : ""
              }
            />
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={handleLogin}
            >
              {t("login:Sign in")}
            </LoadingButton>
            <Link passHref href="/reset-password">
              {t("login:Forgot password? Reset it")}
            </Link>
          </Stack>
        </div>
        <div className="displayGrid">
          <Link passHref href="/register">
            <LoadingButton
              color="success"
              className="marginAutoVertical"
              variant="contained"
            >
              {t("login:First time? Create account")}
            </LoadingButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

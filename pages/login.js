import Link from "next/link";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import styles from "../styles/login.module.css";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import { expectLoggedOUT } from "../hooks/useAuth";
import Image from 'next/image'
import logo from '../public/images/logo.png'
import useLogin from '../hooks/useLogin'

const Login = () => {
  expectLoggedOUT();
  const [data, setData] = useState({})
  const { loading } = useLogin(data)
  const { t } = useTranslation();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const requiredBasicInputLength = useSelector(
    (state) => state.config.requiredBasicInputLength
  );

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = () => {
    setData({
      login,
      password
    })
  };

  return (
    <div className="login">
      <div className={styles.loginBox}>
        <div className={styles.loginLogoBox}>
          <Image alt="Juicify.app" src={logo} />
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

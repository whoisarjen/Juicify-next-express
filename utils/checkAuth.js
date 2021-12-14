import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useShortDate } from "./manageDate";

const expectLoggedIN = () => {
  const router = useRouter();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (!cookies.token) {
      router.push("/login");
    }
  }, []);
};

const expectLoggedOUT = () => {
  const router = useRouter();
  const [cookies] = useCookies(["token"]);
  const login = useSelector((state) => state.token.value.login);

  useEffect(() => {
    if (cookies.token) {
      router.push(`/${login}/nutrition-diary/${useShortDate()}`);
    }
  }, []);
};

const readToken = (token) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export { expectLoggedIN, expectLoggedOUT, readToken };

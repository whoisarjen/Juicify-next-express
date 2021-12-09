import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import useTranslation from "next-translate/useTranslation";

const ErrorNotification = ({
  notificationMessage,
  openNotification,
  closeNotification,
}) => {
  const { t } = useTranslation("home");
  const [snackBarValues] = useState({
    vertical: "bottom",
    horizontal: "right",
  });

  const { vertical, horizontal } = snackBarValues;

  return (
    <Snackbar
      open={openNotification}
      autoHideDuration={6000}
      onClose={closeNotification}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert
        onClose={closeNotification}
        severity="error"
        sx={{ width: "100%" }}
      >
        {notificationMessage || t("Something went wrong")}
      </Alert>
    </Snackbar>
  );
};

export default ErrorNotification;

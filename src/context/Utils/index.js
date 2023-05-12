import React from "react";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";

const initialContext = {
  loadingUtil: false,
  setLoadingUtil: () => {},
  snackbar: () => {},
};

export const UtilContext = React.createContext(initialContext);

export const UtilProvider = (props) => {
  const { children } = props;
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState({
    message: "",
    show: false,
    callback: () => {},
    type: "",
  });

  const showSnackbar = (message, callback, type = "success") => {
    setAlert({
      message,
      callback,
      show: true,
      type,
    });
  };

  return (
    <UtilContext.Provider
      value={{
        loading,
        setLoadingUtil: setLoading,
        snackbar: showSnackbar,
      }}
    >
      <div>
        {alert.show && (
          <Alert
            type={alert.type}
            message={alert.message}
            callback={() => {
              alert.callback();
              setAlert({
                message: "",
                show: false,
                callback: () => {},
              });
            }}
          />
        )}
        {loading && <Loading />}
        {children}
      </div>
    </UtilContext.Provider>
  );
};

export const useUtilContexts = () => React.useContext(UtilContext);

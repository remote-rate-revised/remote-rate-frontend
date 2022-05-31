import React, { useEffect } from "react";
import Main from "./components/Main/Main";
import "./css/App.css";
// import store from "./store/store";
// import { Provider } from "react-redux";

import UserProvider from "./context/userContext";

function App(props) {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <>
      <UserProvider>
        {/* <Provider store={store}> */}
        <Main />
        {/* </Provider> */}
      </UserProvider>
    </>
  );
}

export default App;

import React from "react";
import Main from "./components/Main/Main";
import "./css/App.css";
// import store from "./store/store";
// import { Provider } from "react-redux";

import UserProvider from './context/userContext';

class App extends React.Component {
  render() {
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
}

export default App;

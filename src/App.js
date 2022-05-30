import React from "react";
import Main from "./components/Main/Main";
import "./css/App.css";
import store from "./store/store";
import { Provider } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <Main />
        </Provider>
      </>
    );
  }
}

export default App;

import { Provider } from "react-redux";
import { render } from "react-dom";

import configureStore from "./Redux/store/configureStore";
import App from "./App";
import './index.css';


const store = configureStore();
const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

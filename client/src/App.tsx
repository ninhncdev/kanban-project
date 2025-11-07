import { ConfigProvider, message } from "antd";
import "./App.css";
import Routers from "./routers/Routers";
import "@ant-design/v5-patch-for-react-19";
import { Provider } from "react-redux";
import store from "./reduxs/store";
import { BrowserRouter } from "react-router-dom";
message.config({
  maxCount: 3,
  duration: 2,
  top: 50,
});
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {},
        components: {},
      }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  );
}

export default App;

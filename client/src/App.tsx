import { ConfigProvider, message } from "antd";
import "./App.css";
import Routers from "./routers/Routers";
import "@ant-design/v5-patch-for-react-19";
import { Provider } from "react-redux";
import store from "./reduxs/store";

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
        <Routers />;
      </Provider>
    </ConfigProvider>
  );
}

export default App;

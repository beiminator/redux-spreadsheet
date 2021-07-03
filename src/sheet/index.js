import { Provider } from "react-redux";
import store from "./model/store";
import SheetComponent from "./sheet";

function Sheet() {
  return (
    <Provider store={store}>
      <SheetComponent />
    </Provider>
  );
}

export default Sheet;

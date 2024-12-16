import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//nếu f5 mà vẫn bị lỗi thì là do  không gian lưu trữ (storage) của trình duyệt đã đầy và không thể thêm dữ liệu mới vào localStorage
//vs tôi là do cái ảnh
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
let persistor = persistStore(store);
export { store, persistor };

import { createLogger } from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import sagas from "./saga";
import rootReducer from "./reducer";

const loggerMiddleware = createLogger();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, loggerMiddleware)
);

sagaMiddleware.run(sagas);

export default store;

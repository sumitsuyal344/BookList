import { fork } from "redux-saga/effects";
import listSaga from "./listSaga";


export default function* sagas() {
  yield fork(listSaga().watcher);

}

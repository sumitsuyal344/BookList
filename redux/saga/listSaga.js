import { call, put, takeLatest } from "redux-saga/effects";

import {
  GET_LISTDATA_ERROR,
  GET_LISTDATA_REQUEST,
  GET_LISTDATA_SUCCESS,
} from "../constants/listconstants";
import axios from "axios";

async function getData(key) {
  const response = await axios.get("https://fakerapi.it/api/v1/books");
  const result = await response.data;
  return result.data;
}

function* getBooksList(value) {
  let key = value.key;
  let books = yield call(getData);
  let bookdata = [];
  try {
    if (key === "All") {
      bookdata = books;
      yield put({ type: GET_LISTDATA_SUCCESS, bookdata });
    } else if (key !== "All") {
      bookdata = books?.filter((item, index) => {
        return item.genre === key;
      });
      yield put({ type: GET_LISTDATA_SUCCESS, bookdata });
    }
  } catch (error) {
    const err = error.message;
    yield put({ type: GET_LISTDATA_ERROR, err });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  function* watcher() {
    yield takeLatest(GET_LISTDATA_REQUEST, getBooksList);
  }
  return { watcher };
};

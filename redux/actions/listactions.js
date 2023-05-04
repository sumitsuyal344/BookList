import {
  ADD_ITEMTOCART_REQUEST,
  DELETE_ITEMTOCART_REQUEST,
  GET_LISTDATA_REQUEST,
} from "../constants/listconstants";

export const getListData = (key) => {
  return {
    type: GET_LISTDATA_REQUEST,
    key,
  };
};

export const additemToCart = (book) => {
  return {
    type: ADD_ITEMTOCART_REQUEST,
    book,
  };
};
export const deleteBook = (item) => {
  return {
    type: DELETE_ITEMTOCART_REQUEST,
    item,
  };
};

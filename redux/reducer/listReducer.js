import { ADD_ITEMTOCART_ERROR, ADD_ITEMTOCART_REQUEST, ADD_ITEMTOCART_SUCCESS, DELETE_ITEMTOCART_REQUEST, GET_LISTDATA_ERROR, GET_LISTDATA_REQUEST, GET_LISTDATA_SUCCESS } from "../constants/listconstants";

const initialState = {
    dataList: [],
    error: "",
    loading: false,
    data:[]
  };
  
  const list = (state = initialState, action) => {
    switch (action.type) {
      
      case GET_LISTDATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_LISTDATA_SUCCESS:
        return {
          ...state,
          loading: false,
          dataList: action.bookdata,
          // count: action.count,
        };
      case GET_LISTDATA_ERROR:
        return {
          loading: false,
          error: action.err,
        };
        case ADD_ITEMTOCART_REQUEST:
        return {
          ...state,
          loading: true,
          data: [...state.data, action.book]
        };
        case DELETE_ITEMTOCART_REQUEST:
        return {
          ...state,
          loading: true,
          data: action.item
        };
       
      case ADD_ITEMTOCART_SUCCESS:
        
        return {
          ...state,
          loading: false,
          
        };
      case ADD_ITEMTOCART_ERROR:
        return {
          loading: false,
          error: action.err,
        };
     
      default:
        return state;
    }
  };
  
  export default list;
  
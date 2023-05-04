import { combineReducers } from "redux";

import list from "./listReducer";

const rootReducer = combineReducers({
  listReducer: list,
 
});

export default rootReducer;
import * as si from './actions';
import { signatures_menu } from './dispatchers';

//----------------------------------------------------------------------
const initialState = {
  menu: signatures_menu,
  data: null,
  fieldList: null,
  meta: null,
  isLoading: false,
  error: null
};

//----------------------------------------------------------------------
export default function reducer_Signatures(state = initialState, action) {
  switch (action.type) {
    case si.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case si.GENERATED:
    case si.COMMON:
    case si.DOWNLOADED:
      return {
        ...state,
        data: action.payload.data,
        fieldList: action.payload.fieldList,
        meta: action.payload.meta,
        isLoading: false,
        error: null
      };

    // EXISTING_CODE
    // EXISTING_CODE

    case si.FAILURE:
      return {
        ...state,
        data: null,
        fieldList: null,
        meta: null,
        isLoading: false,
        error: action.err
      };

    default:
      return state;
  }
}
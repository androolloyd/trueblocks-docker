import * as se from './actions';
import { settings_menu } from './dispatchers';

//----------------------------------------------------------------------
const initialState = {
  menu: settings_menu,
  data: null,
  fieldList: null,
  meta: null,
  isLoading: false,
  error: null
};

//----------------------------------------------------------------------
export default function reducer_Settings(state = initialState, action) {
  switch (action.type) {
    case se.BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case se.LICENSES:
    case se.SKINS:
      return {
        ...state,
        data: action.payload.data,
        fieldList: action.payload.fieldList,
        meta: action.payload.meta,
        isLoading: false,
        error: null
      };

    case se.CONFIGURATION:
      return {
        ...state,
        data: action.payload.data[0],
        fieldList: action.payload.fieldList,
        meta: action.payload.meta,
        isLoading: false,
        error: null
      };

    // EXISTING_CODE
    // EXISTING_CODE

    case se.FAILURE:
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
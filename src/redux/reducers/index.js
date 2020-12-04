import { combineReducers } from 'redux';

import AlertReducer from './alert-reducer';
import ProductsReducer from './products-reducer';

export default combineReducers({
  products: ProductsReducer,
  alert: AlertReducer
});
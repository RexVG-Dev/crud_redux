import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  DOWNLOAD_PRODCUTS,
  DOWNLOAD_PRODCUTS_SUCCESS,
  DOWNLOAD_PRODCUTS_ERROR,
  GET_PRODUCT_DELETE,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_ERROR,
  GET_EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR
} from '../types';

// each reducer have his own state

const initialState = {
  products: [],
  error: null,
  loading: false,
  deleteProduct: null,
  editProduct: null
}

const ProductsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PRODUCT:
    case DOWNLOAD_PRODCUTS:
      return {
        ...state,
        loading: action.payload
      }
    case ADD_PRODUCT_SUCCESS:
    return {
      ...state,
      loading: false,
      products: [ ...state.products, action.payload ]
    }
    case DOWNLOAD_PRODCUTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload
      }
    case GET_PRODUCT_DELETE:
      return {
        ...state,
        deleteProduct: action.payload
      }
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        products: state.products.filter( product => product.id !== state.deleteProduct),
        deleteProduct: null
      }
    case GET_EDIT_PRODUCT:
      return {
        ...state,
        editProduct: action.payload
      }
    case EDIT_PRODUCT_SUCCESS :
      return {
        ...state,
        editProduct: null,
        products: state.products.map( product =>
          product.id === action.payload.id ? product = action.payload : product
        )
      }
    case ADD_PRODUCT_ERROR:
    case DOWNLOAD_PRODCUTS_ERROR:
    case PRODUCT_DELETE_ERROR:
    case EDIT_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}
 
export default ProductsReducer;
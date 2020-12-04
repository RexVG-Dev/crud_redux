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
  START_EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR
} from '../types';

import  clientAxios from '../../config/axios';
import Swal from 'sweetalert2';

// create new products

export function CreateNewProductAction(product) {
  return async (dispatch) => {
    dispatch( addProduct());

    try {
      // insert data by API
      await clientAxios.post('/productos', product);

      // if data was insert
      dispatch(addProductSuccess(product));

      // success alert
      Swal.fire(
        'Correcto',
        'El proyecto se agrego corrrectament',
        'success'
      )
    } catch (error) {
      console.log(error);
      dispatch( addProductError(true));

      // error alert
      Swal.fire({
        icon:'error',
        title: 'Hubo un error',
        text:'No es posible realizar una conexión. Intenta más tarde.'
      });
    }
  }
}

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true
});

// if product save in database
const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product
});

// if there a error
const addProductError = (state) => ({
  type: ADD_PRODUCT_ERROR,
  payload: state
});


// function to download producs from api
export function getProductsAction() {
  return async (dispatch) => {

    dispatch(downloadProducts());

    try {
      const response = await clientAxios.get('/productos');
      dispatch( downloadProductsSucces(response.data) );
    } catch (error) {
      dispatch ( downloadProductsError() );
    }
  }
}

const downloadProducts = () => ({
  type: DOWNLOAD_PRODCUTS,
  payload: true
});

const downloadProductsSucces = (products) => ({
  type: DOWNLOAD_PRODCUTS_SUCCESS,
  payload: products
});

const downloadProductsError = () => ({
  type: DOWNLOAD_PRODCUTS_ERROR,
  payload: true
});

// select and delete product
export function deleteProductAction(id) {
  return async (dispatch) => {
    dispatch(getProductDelete(id));

    try {
      await clientAxios.delete(`/productos/${id}`);

      dispatch ( productDeleteSucces() );


      // if deleted it
      Swal.fire(
        'Eliminado',
        'El producto se ha eliminado',
        'success'
      )
      
    } catch (error) {
      dispatch (productDeleteError())
    }
  }
}

const getProductDelete = (id) => ({
  type: GET_PRODUCT_DELETE,
  payload: id
});

const productDeleteSucces = () => ({
  type: PRODUCT_DELETE_SUCCESS,
});

const productDeleteError = () => ({
  type: PRODUCT_DELETE_ERROR,
  payload: true
});


export function getEditProduct(product) {
  return (dispatch) => {
    dispatch( getEditProductAction(product) );
  }
}

const getEditProductAction = product => ({
  type: GET_EDIT_PRODUCT,
  payload: product
});

// Edit a product in the api
export function editProductAction(product) {
  return async ( dispatch) => {
    dispatch (editProduct());

    try {
      await clientAxios.put(`/productos/${product.id}`, product);
      dispatch(editProductSuccess(product));
    } catch (error) {
      dispatch( editProductError() );
      // error alert
      Swal.fire({
        icon:'error',
        title: 'Hubo un error',
        text:'No es posible realizar una conexión. Intenta más tarde.'
      });
    }
  }
}

const editProduct = () => ({
  type: START_EDIT_PRODUCT
});

const editProductSuccess = product => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: product
});

const editProductError = () =>({
  type: EDIT_PRODUCT_ERROR,
  payload: true
});
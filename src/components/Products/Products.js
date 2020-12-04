import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getProductsAction} from '../../redux/actions/product-actions';

import Product from '../Product/Product';

const Products = () => {

  const dispatch =  useDispatch();

  useEffect(() => {
    // Consult the api
    const loadProducts = () => dispatch(getProductsAction())
    loadProducts();
  }, [dispatch]);

  // get State
  const products = useSelector( state => state.products.products);
  const error = useSelector( state => state.products.error);
  const loading = useSelector ( state => state.products.loading);

  return (
    <Fragment>
      <h2 className="text-center my-5">Listado de productos</h2>
      {error ?  <p className="font-weigth-bold alert alert-danger text-center mt-4">Hubo un error</p>: null}
      {loading ? <p className="text-center">Cargando...</p> : null }

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          { products.length === 0 ? 'No hay productos' : (
            products.map( product => (
              <Product
                key={product.id}
                product = {product}
              />
            ))
          )}
        </tbody>
      </table>
    </Fragment>
  );
}
 
export default Products;
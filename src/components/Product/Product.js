import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux

import { useDispatch } from 'react-redux';
import { deleteProductAction, getEditProduct } from '../../redux/actions/product-actions';


const Product = ({product}) => {
  const { name, price, id} = product;

  const dispatch = useDispatch();

  const history =  useHistory();


  // confirm to delete product
  const confirmDeleteProduct = id => {
    // confirm with user the delete action
    Swal.fire({
      title: 'Eliminar Prodcuto',
      text: '¿Estás seguro de eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then( (result) => {
      if(result.value) {
        // pass to action
        dispatch( deleteProductAction(id ));
      }
    })

  }

  // function to redirect
  const redirectEdit = product => {
    dispatch (getEditProduct(product));
    history.push(`/productos/editar/${product.id}`);
  }

  return (
    <tr>
      <td>{name}</td>
      <td><span className="font-weight-bold">$ {price}</span></td>
      <td className="actions">
        <button type="button" className="btn btn-primary mr-2"
          onClick= {() => redirectEdit(product)}> Editar</button>
        <button
          type="button"
          className="btn btn-danger"
          onClick= {() => confirmDeleteProduct(id)}>Eliminar</button>
      </td>
    </tr>
  );
}
 
export default Product;
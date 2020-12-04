import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { editProductAction } from '../../redux/actions/product-actions';

const EditProduct = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    name: '',
    price: 0
  });

  // product to edit
  const productEdit = useSelector( state => state.products.editProduct);
  
  useEffect(() => {
    setProduct(productEdit);
  }, [productEdit])

  const onChangeForm = e => {
    setProduct({
      ...product,
      [e.target.name] : e.target.value
    });
  }
  
  const {name, price } = product;

  const submitEditProdcut = e => {
    e.preventDefault();

    dispatch(editProductAction(product));

    history.push('/');
  }
  return (
    <Fragment>
      <h1>From EditProduct.js</h1>
      <div className="row justify-content-center my-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4 font-weigth-bold">Editar Producto</h2>
              <form onSubmit={submitEditProdcut}>
                <div className="from-group">
                  <label>Nombre Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre Producto"
                    name="name"
                    value= {name}
                    onChange = {onChangeForm}
                  ></input>
                  <label>Precio Producto</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Precio Producto"
                    name="price"
                    value= {price}
                    onChange = {onChangeForm}
                  ></input>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary font-wegiht-bold text-uppercase d-block w-100 my-3"
                > Guardar cambios </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditProduct;
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { CreateNewProductAction } from '../../redux/actions/product-actions';
import { showAlertAction, hideAlertAction } from '../../redux/actions/alert-actions';

const NewProduct = ({history}) => {

  // component state
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  // use useDispatch and create a function 
  const dispatch = useDispatch();

  // acces to store's state
  const loading = useSelector( state => state.products.loading);
  const error = useSelector(state => state.products.error);
  const alert = useSelector(state => state.alert.alert);

  // call action from product-action
  const addProduct = (product) => dispatch ( CreateNewProductAction(product));


  const submitProduct = (e) => {
    e.preventDefault();

    // validate form
    if (name.trim() === '' || price.toString().trim() === '' || price <= 0) {

      const alert = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }
      dispatch ( showAlertAction(alert) );

      return;
    }

    dispatch( hideAlertAction() );

    // create new product
    addProduct({
      name,
      price
    });

    // redirect to home
    history.push('/');
  }
  return (
    <div className="row justify-content-center my-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weigth-bold">Agregar Nuevo Producto</h2>

            { alert ? <p className={alert.classes}>{alert.msg}</p> : null }
            <form onSubmit= {submitProduct}>
              <div className="from-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name= "name"
                  value = {name}
                  onChange = { e => setName(e.target.value)}
                ></input>
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name= "price"
                  value = {price}
                  onChange = { e => setPrice(Number(e.target.value))}
                ></input>
              </div>
              <button
                type="submit"
                className="btn btn-primary font-wegiht-bold text-uppercase d-block w-100 my-3"
              > Agregar </button>
            </form>

            { loading ? <p>Cargando...</p> : null}

            {error ? <p className="aler alert-danger p-2 mt-4 text-center">Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default NewProduct;
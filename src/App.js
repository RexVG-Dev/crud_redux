import React from 'react';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import NewProduct from './components/NewProduct/NewProduct';
import EditProduct from './components/EditProduct/EditProuct';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header/>

        <div className="container">
          <Switch>
            <Route exact path="/" component={Products}></Route>
            <Route exact path="/productos/nuevo" component={NewProduct}></Route>
            <Route exact path="/productos/editar/:id" component={EditProduct}></Route>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;

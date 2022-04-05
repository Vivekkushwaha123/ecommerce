import './App.css';
import { useState, useEffect } from 'react';
import { commerce } from './lib/commerce'
import { Products, Navbar, Cart , Checkout , Review} from './components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const App = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order , setOrder] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setCart(response.cart);
  }

  const refreshCart =async () => {
    const newCart =await commerce.cart.refresh();
    setCart(newCart);
  }

  const handleCaptureCheckout = async(CheckoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(CheckoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message)
    }
  }

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);

    setCart(response.cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };


  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(cart);


  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route >

          <Route exact path="/cart">
            <Cart cart={cart} 
            onUpdateCartQty={handleUpdateCartQty} 
            onRemoveFromCart={handleRemoveFromCart} 
            onEmptyCart={handleEmptyCart}            
            />
          </Route>

          <Route exact path='/checkout'>
            <Checkout
            order ={order}
            onCaptureCheckout ={handleCaptureCheckout}
            error ={errorMessage}
            cart = {cart}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

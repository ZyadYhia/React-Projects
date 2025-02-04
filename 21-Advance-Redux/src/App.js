import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useEffect } from 'react';
import { sendCartDate, fetchCartData } from './Store/cart-actions';

let isInit = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.isVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])
  useEffect(() => {
    if (isInit) {
      isInit = false;
      return;
    }
    
    if (cart.changed) {
      console.log(cart.changed);
      dispatch(sendCartDate(cart));
    }

  }, [cart, dispatch])
  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;

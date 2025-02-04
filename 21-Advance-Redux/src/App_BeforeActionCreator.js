import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useEffect } from 'react';
import { uiActions } from './Store/ui-slice';

let isInit = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.isVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  // useEffect will be executed once the application reloads
  // this will cause that the cart will be saved in the database with initial values 
  useEffect(() => {
    const sendCartData = async () => {

      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Pending...',
        message: 'Sending cart data!'
      }))
      const response = await fetch('https://reactdb-1e67f-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      })
      if (!response.ok) {
        throw new Error('Sending cart data failed')
      }
      // const responseData = await response.json()

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success',
        message: 'Sending cart data succeeded!'
      }))
    }
    if (isInit) {
      isInit = false;
      return;
    }
    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!'
      }))
    })
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

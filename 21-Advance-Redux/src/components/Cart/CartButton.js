import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../Store/ui-slice'; 
import classes from './CartButton.module.css';


const CartButton = (props) => {
  const Qnt = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  }
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{Qnt}</span>
    </button>
  );
};

export default CartButton;

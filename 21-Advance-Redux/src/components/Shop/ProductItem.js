import { useDispatch } from 'react-redux';
import { cartActions } from '../../Store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = ({ id, title, price, description }) => {
  const dispatch = useDispatch();

  const addItemToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addItemToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;

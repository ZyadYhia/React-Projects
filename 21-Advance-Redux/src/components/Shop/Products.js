import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'Test',
    price: 6,
    description: 'This is a first product - amazing!',
  },
  {
    id: 'p2',
    title: 'Test2',
    price: 12,
    description: 'This is a seond product - amazing!',
  },
  {
    id: 'p3',
    title: 'Test3',
    price: 18,
    description: 'This is a third product - amazing!',
  },
  {
    id: 'p4',
    title: 'Test4',
    price: 4,
    description: 'This is a forth product - amazing!',
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_PRODUCTS.map(product => (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          ))
        }
      </ul>
    </section>
  );
};

export default Products;

import { useParams, useNavigate, Link } from 'react-router-dom';
function ProductDetails() {
    const params = useParams();
    const navigator = useNavigate();
    const { productId } = params;
    return (
        <>
            <h1>Product Details Page: {productId}</h1>
            <button onClick={() => navigator(-1)}>Go Back</button>
            <Link to=".." relative='path'>Go Back</Link>
        </>
    );
}
export default ProductDetails;
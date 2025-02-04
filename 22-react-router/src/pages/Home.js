import { Link, useNavigate } from "react-router-dom";


function HomePage() {
    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate('/products');
    }
    return (
        <div>
            <h1>Home Page</h1>
            <p>Go To <Link to="products">Products</Link></p>
            <p>
                Go To <button onClick={navigateHandler}>Products</button>
            </p>
        </div>
    );
}
export default HomePage;
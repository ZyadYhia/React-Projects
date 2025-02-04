import MainNavigation from "../components/MainNavigation";
import { Link } from "react-router-dom";
function ErrorPage() {
    return (
        <>
            <MainNavigation />
            <main>
                <h1>Page not found!</h1>
                <p>Go To <Link to="/">Home</Link></p>
            </main>
        </>
    );
}

export default ErrorPage;
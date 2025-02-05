import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";
import { Link, useRouteError } from "react-router-dom";
function ErrorPage() {
    // useRouterError is used to get the error message
    const routeError = useRouteError();
    let title = "An error occurred!";
    let message = "Something went wrong!";    
    if (routeError.status === 500) {
        message = JSON.parse(routeError.data).message;
    }
    if (routeError.status === 404) {
        title = "Page not found!";
        message = "The page you are looking for does not exist!";
    }
    return (
        <>
            <MainNavigation />
            <main>
                <PageContent title={title} >
                    <p>{message}</p>
                </PageContent>


                <p>Go To <Link to="/">Home</Link></p>
            </main>
        </>
    );
}

export default ErrorPage;
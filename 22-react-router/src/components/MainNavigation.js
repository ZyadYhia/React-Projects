import { Link, NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css'
function MainNavigation() {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        {/*
                            The NavLink component is a special version of the Link component
                            that adds extra functionality to the link. 
                            the className prop is a function that receives an object with a property isActive.
                            isActive is a boolean that indicates whether the link is active or not.
                            If the link is active, the function should return a string with the CSS classes to apply.
                            If the link is not active, the function should return an empty string.
                         */}
                         {/* end indicate that the path ends with the current path */}
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) => isActive ? classes.active : ''}>
                            Home
                        </NavLink>
                        {/* <Link to="/">Home</Link> */}
                    </li>
                    <li>
                        <NavLink to="/products" className={({ isActive }) => isActive ? classes.active : ''}>Products</NavLink>
                        {/* <Link to="/products">Products</Link>  */}
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default MainNavigation;
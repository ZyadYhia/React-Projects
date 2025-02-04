import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
    return (
        <div>
            <MainNavigation />
            {/* to wrapp the content  */}
            <main>
                <Outlet />
            </main>
        </div>
    );
}
export default RootLayout;
// import { Outlet } from "react-router-dom";
// import Marquee from "./marquee";
// import Navbar from "./navbar";
// import Footer from "./footer";

// const Layout = () => {
//     return (
//         <div className="min-h-screen flex flex-col">
//             <Marquee />
//             <Navbar />

//             <main className="flex-1">
//                 <Outlet />
//             </main>

//             <Footer />
//         </div>
//     );
// };

// export default Layout;

import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar"; // Adjust path to your Navbar component
import Marquee from "./marquee"; // Adjust path to your Marquee component
import Footer from "./footer";

const Layout = () => {
    const location = useLocation();

    // Check if the current path is the checkout page
    const isCheckoutPage = location.pathname.toLowerCase() === "/order";

    return (
        <>
            {/* Hide Marquee and Navbar when on the checkout page */}
            {!isCheckoutPage && (
                <>
                    <Marquee />
                    <Navbar />
                </>
            )}
            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />

            {/* Your Route/Page Content */}
            {/* <Outlet /> or your routing component goes here */}
        </>
    );
};

export default Layout;
import React, { useEffect } from "react"; // 1. Import useEffect
import Hero from "../components/hero";
import ShopByCategory from "../components/category";
// import ProductGrid from "../components/productselling";
import Feature from "../components/feature";
import Why from "../components/why";
import Reviews from "../components/reviews";
function Home() {

    // 2. Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>

            <Hero />
            <ShopByCategory />
            {/* <ProductGrid /> */}
            <h1 className="pl-12 text-xl font-medium tracking-tight text-gray-900 sm:text-3xl">
                Featured Collection
            </h1>
            <Feature />
            <Why />
            <Reviews />
        </>
    );
}

export default Home;
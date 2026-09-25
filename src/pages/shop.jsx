import React from 'react'
import ShopProducts from '../components/shopProducts'

function Shop() {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-8">
            <h1 className="text-3xl font-medium text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl">
                Products
            </h1>
            <ShopProducts />
        </div>
    )
}

export default Shop
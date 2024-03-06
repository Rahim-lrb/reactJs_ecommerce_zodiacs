import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext({ items: [], getProductQuantity: () => {}, addOneToCart: () => {}, removeOneFromCart: () => {},
deleteFromCart: () => {}, getTotalCost: () => {}});

export const useProductContext = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    function getProductQuantity(id) {
        const quantity = cartItems.find(product => product.id === id)?.quantity;
        if (quantity === undefined) return 0;    
        return quantity;
    }

    function addOneToCart(id, price) {
        const quantity = getProductQuantity(id);
        if (quantity === 0) { // product is not in cart
            setCartItems( [ ...cartItems, { id: id, quantity: 1, price: price }] )
        } else { // product is in cart
            // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]    add to product id of 2
            setCartItems( cartItems.map( product => product.id === id  // if condition
                    ? { ...product, quantity: product.quantity + 1 } // if statement is true
                    : product                                        // if statement is false
                )
            )
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if(quantity == 1) {
            deleteFromCart(id);
        } else {
            setCartItems(
                cartItems.map( product => product.id === id  // if condition
                    ? { ...product, quantity: product.quantity - 1 } // if statement is true
                    : product                                        // if statement is false
                )
            )
        }
    }

    function deleteFromCart(id) {
        setCartItems( cartProducts =>
            cartProducts.filter(currentProduct => {
                return currentProduct.id != id;
            })  
        )
    }

    function clear(id) {
        setCartItems([])
    }

    function getTotalCost(cartItems) {
        console.log(cartItems);
      
        // Initialize totalCost
        let totalCost = 0;
      
        // Calculate totalCost based on each item's price and quantity
        // cartItems.forEach((cartItem) => {
        //   totalCost += cartItem.price * cartItem.quantity;
        // });
      
        // console.log("Total Cost:", totalCost);
      
        return totalCost;
      }

    return (
        <ProductContext.Provider value={{ items: cartItems, addOneToCart, removeOneFromCart, deleteFromCart, getProductQuantity, getTotalCost, clear }}>
        {children}
        </ProductContext.Provider>
    );
};

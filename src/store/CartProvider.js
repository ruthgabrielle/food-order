import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];

        let uptadedItems;

        if(existingCartItem) {
            const uptadedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            uptadedItems = [...state.items];
            uptadedItems[existingCartItemIndex] = uptadedItem;
        } else {
            uptadedItems = state.items.concat(action.item);
        }

        const updatedItems = state.items.concat(action.item);
        return {
            items: updatedItems,
            amount: updatedTotalAmount
        };
    }
    return defaultCartState;
}

const CartProvider = (props) => {
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCart({ type: 'ADD', item: item });
    }

    const removeItemFromCartHandler = (id) => {
        dispatchCart({ type: 'REMOVE', id: id });
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider
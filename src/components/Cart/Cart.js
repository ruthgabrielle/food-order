import React, { useContext, useState } from 'react';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isChecking, setIsChecking] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItem = cartCtx.items.length > 0;

    const cartRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    };

    const cartAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    };

    const orderHandler = () => {
        setIsChecking(true)
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-http-ac-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}> Close</button>
        {hasItem && <button className={classes.button} onClick={orderHandler}> Order </button>}
    </div>

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) =>
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartRemoveHandler.bind(null, item.id)}
                    onAdd={cartAddHandler.bind(null, item)} />
            )}
        </ul>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span> Total Amount </span>
                <span> {totalAmount} </span>
            </div>
            {isChecking && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            {!isChecking && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmitModalContent = (<React.Fragment>
        <p>Successfully send order data</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}> Close</button>
        </div>
    </React.Fragment>
    )

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>


    )
}
export default Cart
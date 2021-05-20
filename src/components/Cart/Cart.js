import { useContext } from 'react';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount}`;

    const hasItem = cartCtx.items.length > 0;

    const cartRemoveHandler = (id) => {

    }

    const cartAddHandler = (item) => {

    }

    const cartItems =
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

    return <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
            <span> Total Amount</span>
            <span> {totalAmount} </span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}> Close</button>
            {hasItem && <button className={classes.button}> Order </button>}
        </div>
    </Modal>
}
export default Cart
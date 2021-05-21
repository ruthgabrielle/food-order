import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const [btnHighlighted, setBtnHighlited] = useState(false)
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    const numberItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnHighlited(true);

        const timer = setTimeout(() => {
            setBtnHighlited(false);
        }, 300);

        return () => {
            clearTimeout(timer)
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your cart
        </span>
            <span className={classes.badge}>
                {numberItems}
            </span>
        </button>)
}
export default HeaderCartButton;
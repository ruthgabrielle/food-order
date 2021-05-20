import React from "react";
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import mealsImg from '../../assets/meal.jpg';

const Header = (props) => {
    return <React.Fragment>
        <header className={classes.header}>
            <h1> Meals Application</h1>
            <HeaderCartButton  onClick={props.onOpenCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImg} alt='Table w/ food looking very good' />
        </div>
    </React.Fragment>
};
export default Header
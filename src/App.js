import React, {useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [open, setOpen] = useState(false);

  const openCartHandler = () => {
    setOpen(true);
  };

  const hideCartHandle = () => {
    setOpen(false);
  };

  return (
    <CartProvider>
      {open && <Cart onClose={hideCartHandle} />}
      <Header onOpenCart={openCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App;

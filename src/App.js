import React, {useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
  const [open, setOpen] = useState(false);

  const openCartHandler = () => {
    setOpen(true);
  };

  const hideCartHandle = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {open && <Cart onClose={hideCartHandle} />}
      <Header onOpenCart={openCartHandler} />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;

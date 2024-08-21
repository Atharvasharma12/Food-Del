import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setcardItems] = useState({});
  const url = "http://localhost:7000";
  const [token, setToken] = useState("");
  const addTocart = (itemId) => {
    if (!cartItems[itemId]) {
      setcardItems((prev) => ({ ...prev, [itemId]: 1 }));
      // kabhi add to cart m kuch nhi h to vo 1 kardega
    } else {
      setcardItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      //  kabhi kuch select karka rakha h to increase kardega
    }
  };

  const removeFromCard = (itemId) => {
    setcardItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    //  remove krdega kabhi minus p click kra ho to
  };

  const getTotalCartAmount = () => {
    let totalamount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalamount += itemInfo.price * cartItems[item];
      }
    }
    return totalamount;
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  const contextvalue = {
    food_list,
    cartItems,
    setcardItems,
    addTocart,
    removeFromCard,
    url,
    getTotalCartAmount,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextvalue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

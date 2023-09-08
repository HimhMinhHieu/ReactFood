import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useReducer } from "react";
import cookie from "react-cookies";
import MyUserReducer from "./reducers/MyUserReducer";
import Login from "./components/Login";
import Register from "./components/Register";
import User from "./components/User";
import FoodStore from "./components/FoodStore";
import StoreDetails from "./components/StoreDetails";
import ManageStore from "./components/ManageStore";
import AddFood from "./components/AddFood";
import UpdateFood from "./components/UpdateFood";
import GoongMap from "./components/GoongMap";
import FoodDetail from "./components/FoodDetail";
import StoreSignup from "./components/StoreSignup";
import MyCartCounterReducer from "./reducers/MyCartCounterReducer";
import Cart from "./components/Cart";

export const MyUserContext = createContext();
export const MyCartContext = createContext();

const countCart = () => {
  let cart = cookie.load("cart") || null;
  if (cart !== null)
    return Object.values(cart).reduce((init, current) => init + current["quantity"], 0);
  return 0;
}

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, cookie.load("user") || null);
  const [cartCounter, cartDispatch] = useReducer(MyCartCounterReducer, countCart());
  return(
    <>
    <MyUserContext.Provider value={[user, dispatch]}>
    <MyCartContext.Provider value={[cartCounter, cartDispatch]}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
          <Route path="/stores/:storeId" element={<FoodStore />} />
          <Route path="/stores/details" element={<StoreDetails />} />
          <Route path="/stores/manager/:storeId" element={<ManageStore />} />
          <Route path="/stores/manager/addfood" element={<AddFood />} />
          <Route path="/stores/foods/updatefood/:foodId" element={<UpdateFood />} />
          <Route path="/goongmap/shop" element={<GoongMap />} />
          <Route path="/foods/:foodId" element={<FoodDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/stores/signup" element={<StoreSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </MyCartContext.Provider>
    </MyUserContext.Provider>
    
    </>
  )
}

export default App;
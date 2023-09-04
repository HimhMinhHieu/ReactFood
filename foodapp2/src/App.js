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

export const MyUserContext = createContext();

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, cookie.load("user") || null);
  return(
    <>
    <MyUserContext.Provider value={[user, dispatch]}>
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </MyUserContext.Provider>
    </>
  )
}

export default App;
import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/foodapp";
const SERVER = "http://localhost:8080";

export const endpoints = {
    "categories": `${SERVER_CONTEXT}/api/categories/`,
    "catestores": `${SERVER_CONTEXT}/api/catestores/`,
    "stores": `${SERVER_CONTEXT}/api/stores/`,
    "foods": `${SERVER_CONTEXT}/api/stores/foods/`,
    "add_foods": `${SERVER_CONTEXT}/api/stores/foods/addfood/`,
    "foods_details": (foodId) => `${SERVER_CONTEXT}/api/foods/${foodId}/`,
    "update_foods": (foodId) => `${SERVER_CONTEXT}/api/stores/foods/updatefood/${foodId}/`,
    "store_details":`${SERVER_CONTEXT}/api/current-user/stores/details/`,
    "store_foods": (storeId) => `${SERVER_CONTEXT}/api/stores/${storeId}/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "register": `${SERVER_CONTEXT}/api/users/`,
    "login": `${SERVER_CONTEXT}/api/login/`,
}

export const authApi = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization":  cookie.load("token")
        }
    })
}

export default axios.create({
    baseURL: SERVER
});
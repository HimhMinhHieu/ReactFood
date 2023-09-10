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
    "delete_food": (foodId) => `${SERVER_CONTEXT}/api/stores/foods/${foodId}/`,
    "store_details":`${SERVER_CONTEXT}/api/current-user/stores/details/`,
    "store_foods": (storeId) => `${SERVER_CONTEXT}/api/stores/${storeId}/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "register": `${SERVER_CONTEXT}/api/users/`,
    "login": `${SERVER_CONTEXT}/api/login/`,
    "comments": (storeId) => `${SERVER_CONTEXT}/api/stores/${storeId}/comments/`,
    "add-comment": `${SERVER_CONTEXT}/api/comments/`,
    "comments-food": (foodId) => `${SERVER_CONTEXT}/api/foods/${foodId}/comments/`,
    "add-comment-food": `${SERVER_CONTEXT}/api/foods/comments/`,
    "add-store": `${SERVER_CONTEXT}/api/stores/request/`,
    "request": (reqId) => `${SERVER_CONTEXT}/api/request/${reqId}/`,
    "pay": `${SERVER_CONTEXT}/api/pay/`,
    "receipt": `${SERVER_CONTEXT}/api/receipt/`,
    "chart": `${SERVER_CONTEXT}/api/receipt/chart/`,
    "chart-month": (storeId) => `${SERVER_CONTEXT}/api/receipt/chart/${storeId}/`
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
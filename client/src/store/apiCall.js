import axios from 'axios'
import { login, loginFail, update } from './cart-shopping/authSlice'
import { addItem, resetProduct } from './cart-shopping/cartSlice'
const DOMAIN = process.env.REACT_APP_DOMAIN

export const userLogin = async (data, dispatch) => {
    try {
        const res = await axios.post(`${DOMAIN}/auth/login`, data)
        res && dispatch(login(res.data))
    } catch (error) {
        dispatch(loginFail())
    }
}

export const userRegister = async (data, dispatch, navigate) => {
    try {
        const res = await axios.post(`${DOMAIN}/auth/register`, data)
        res && navigate('/login')
    } catch (error) {
        dispatch(loginFail())
    }
}

export const userUpdate = async (user, dispatch, data) => {
    try {
        const res = await axios.put(`${DOMAIN}/users/` + user._id, data)

        res && dispatch(update(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (id) => {
    try {
        const res = await axios.get(`${DOMAIN}/users/find/`)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const getProducts = async () => {
    try {
        const res = await axios.get(`${DOMAIN}/products`)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const getAProduct = async (id) => {
    try {
        const res = await axios.get(`${DOMAIN}/products/find/` + id)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const createCart = async (data, dispatch) => {
    try {
        const res = await axios.post(`${DOMAIN}/cart`, data)
        res && dispatch(addItem(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const getCart = async (id, dispatch) => {
    try {
        const res = await axios.get(`${DOMAIN}/cart/find/` + id)

        if (res.data.products.length > 0) {
            dispatch(resetProduct(res.data))
        }
    } catch (err) {
        console.log(err)
    }
}

export const remove = async (id, user) => {
    try {
        await axios.post(`${DOMAIN}/cart/product/` + id, user)
        await getCart()
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (id, user, dispatch) => {
    try {
        const res = await axios.post(`${DOMAIN}/cart/` + id, user)
        dispatch(deleteProduct(res.data))
    } catch (error) {
        console.log(error)
    }
}

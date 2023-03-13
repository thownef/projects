import axios from 'axios'
import { productAction } from './adminSlice/productSlice'
import { userAction } from './adminSlice/userSlice'

export const getProducts = async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:8888/api/products/')
        res && dispatch(productAction.getProducts(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const deleteProduct = async (id, dispatch) => {
    try {
        await axios.delete('http://localhost:8888/api/products/' + id)
        await getProducts(dispatch)
    } catch (err) {
        console.log(err)
    }
}

export const addProduct = async (data, dispatch) => {
    try {
        await axios.post('http://localhost:8888/api/products/', data)
        await getProducts(dispatch)
    } catch (err) {
        console.log(err)
    }
}

export const updateProduct = async (data, id, dispatch) => {
    try {
        await axios.put('http://localhost:8888/api/products/' + id, data)
        await getProducts(dispatch)
    } catch (err) {
        console.log(err)
    }
}

export const getUsers = async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:8888/api/users')
        dispatch(userAction.getUsers(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const newUser = async (data, dispatch, history) => {
    try {
        await axios.post('http://localhost:8888/api/auth/register/', data)
        await getUsers(dispatch)
    } catch (err) {
        console.log(err)
    }
}

export const deleteUser = async (id, dispatch) => {
    try {
        await axios.delete('http://localhost:8888/api/users/' + id)
        await getUsers(dispatch)
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (id, data, dispatch) => {
    console.log(id)
    try {
        await axios.put('http://localhost:8888/api/users/' + id, data)
        await getUsers(dispatch)
    } catch (error) {
        console.log(error)
    }
}

import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import AllProduct from './page/AllProduct/AllProduct'
import Cart from './page/Cart/Cart'
import Checkout from './page/Checkout/Checkout'
import Home from './page/Home/Home'
import Login from './page/Login/Login'
import ProductDetail from './page/ProductDetail/ProductDetail'
import Profile from './page/Profile/Profile'
import Register from './page/Register/Register'

function App() {
    const user = useSelector((state) => state.auth.user)

    return (
        <div>
            <Routes>
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path='/home' element={<Home />} />
                <Route path='/product/:id' element={<ProductDetail />} />
                <Route path='/products' element={<AllProduct />} />
                <Route path='/cart' element={<Cart />} />
                <Route
                    path='/profile'
                    element={user ? <Profile /> : <Navigate to='/login' />}
                />
                <Route
                    path='/login'
                    element={user ? <Navigate to='/' /> : <Login />}
                />
                <Route
                    path='/register'
                    element={user ? <Navigate to='/' /> : <Register />}
                />
                <Route path='/checkout' element={<Checkout />} />
            </Routes>
        </div>
    )
}

export default App

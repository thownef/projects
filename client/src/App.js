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
import ROUTES from './constant/routes'

function App() {
    const user = useSelector((state) => state.auth.user)

    return (
        <div>
            <Routes>
                <Route path='/' element={<Navigate to={ROUTES.HOME} />} />
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route
                    path={ROUTES.PRODUCT_DETAIL}
                    element={<ProductDetail />}
                />
                <Route path={ROUTES.PRODUCTS} element={<AllProduct />} />
                <Route path={ROUTES.CART} element={<Cart />} />
                <Route
                    path={ROUTES.PROFILE}
                    element={
                        user ? <Profile /> : <Navigate to={ROUTES.LOGIN} />
                    }
                />
                <Route
                    path={ROUTES.LOGIN}
                    element={user ? <Navigate to='/' /> : <Login />}
                />
                <Route
                    path={ROUTES.REGISTER}
                    element={user ? <Navigate to='/' /> : <Register />}
                />
                <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
            </Routes>
        </div>
    )
}

export default App

import React, { useState } from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import './profile.css'
import Footer from '../../components/Footer/Footer'
import { userUpdate } from '../../store/apiCall'

export default function Profile() {
    const user = useSelector((state) => state.auth.user)

    const [data, setData] = useState({})
    const dispatch = useDispatch()

    const updateUser = (e) => {
        e.preventDefault()
        userUpdate(user, dispatch, data)
    }

    return (
        <div>
            <Header />
            <div className='highlight'></div>
            <div className='profile'>
                <div className='profileTitleContainer'>
                    <h1 className='profileTitle'>Trang cá nhân</h1>
                </div>
                <div className='profileContainer'>
                    <div className='profileShow'>
                        <div className='profileShowTop'>
                            <img
                                src={user.image}
                                alt=''
                                className='profileShowImg'
                            />
                            <div className='profileShowTopTitle'>
                                <span className='profileShowUsername'>
                                    {user.username}
                                </span>
                            </div>
                        </div>
                        <div className='profileShowBottom'>
                            <span className='profileShowTitle'>
                                Account Details
                            </span>
                            <div className='profileShowInfo'>
                                <PermIdentityIcon className='profileShowIcon' />
                                <span className='profileShowInfoTitle'>
                                    {user.username}
                                </span>
                            </div>
                            <div className='profileShowInfo'>
                                <CalendarTodayIcon className='profileShowIcon' />
                                <span className='profileShowInfoTitle'>
                                    {new Date(user.createdAt).toDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='profileUpdate'>
                        <span className='profileUpdateTitle'>Edit</span>
                        <form className='profileUpdateForm'>
                            <div className='profileUpdateLeft'>
                                <div className='profileUpdateItem'>
                                    <label>Tên đăng nhập</label>
                                    <input
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                username: e.target.value,
                                            })
                                        }
                                        type='text'
                                        placeholder={user.username}
                                        className='profileUpdateInput'
                                    />
                                </div>
                                <div className='profileUpdateItem'>
                                    <label>Mật khẩu</label>
                                    <input
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                password: e.target.value,
                                            })
                                        }
                                        type='password'
                                        placeholder='••••••'
                                        className='profileUpdateInput'
                                    />
                                </div>
                                <div className='profileUpdateRight'>
                                    <button
                                        onClick={updateUser}
                                        className='profileUpdateButton'
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='highlight'></div>

            <Footer />
        </div>
    )
}

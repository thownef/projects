import { CalendarToday, PermIdentity } from '@material-ui/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getUser } from '../../../../client/src/store/apiCall'
import { updateUser } from '../../redux/apiCalls'
import './user.css'

export default function User() {
    const param = useParams()
    const { userId: id } = param
    const [user, setUser] = useState({})
    const [data, setData] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        getUser(id)
            .then((data) => {
                setUser(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const handleClick = () => {
        updateUser(id, data, dispatch)
    }

    return (
        <div className='user'>
            <div className='userTitleContainer'>
                <h1 className='userTitle'>Edit User</h1>
                <Link to='/newUser'>
                    <button className='userAddButton'>Create</button>
                </Link>
            </div>
            <div className='userContainer'>
                <div className='userShow'>
                    <div className='userShowTop'>
                        <img src={user.image} alt='' className='userShowImg' />
                        <div className='userShowTopTitle'>
                            <span className='userShowUsername'>
                                {user.username}
                            </span>
                        </div>
                    </div>
                    <div className='userShowBottom'>
                        <span className='userShowTitle'>Account Details</span>
                        <div className='userShowInfo'>
                            <PermIdentity className='userShowIcon' />
                            <span className='userShowInfoTitle'>
                                {user.username}
                            </span>
                        </div>
                        <div className='userShowInfo'>
                            <CalendarToday className='userShowIcon' />
                            <span className='userShowInfoTitle'>
                                {new Date(user.createdAt).toDateString()}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='userUpdate'>
                    <span className='userUpdateTitle'>Edit</span>
                    <form className='userUpdateForm'>
                        <div className='userUpdateLeft'>
                            <div className='userUpdateItem'>
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
                                    className='userUpdateInput'
                                />
                            </div>
                            <div className='userUpdateItem'>
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
                                    className='userUpdateInput'
                                />
                            </div>
                            <div className='userUpdateRight'>
                                <button
                                    onClick={handleClick}
                                    className='userUpdateButton'
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

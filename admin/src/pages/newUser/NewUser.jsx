import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { newUser } from '../../redux/apiCalls'
import './newUser.css'

export default function NewUser() {
    const [data, setData] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()

    const handleClick = (e) => {
        newUser(data, dispatch)
        history.push('/users')
    }

    return (
        <div className='newUser'>
            <h1 className='newUserTitle'>New User</h1>
            <form className='newUserForm'>
                <div className='newUserItem'>
                    <label>Tên đăng nhập</label>
                    <input
                        onChange={(e) =>
                            setData({ ...data, username: e.target.value })
                        }
                        type='text'
                        placeholder='username'
                    />
                </div>
                <div className='newUserItem'>
                    <label>Mật khẩu</label>
                    <input
                        onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                        }
                        type='text'
                        placeholder='123456'
                    />
                </div>

                <button onClick={handleClick} className='newUserButton'>
                    Create
                </button>
            </form>
        </div>
    )
}

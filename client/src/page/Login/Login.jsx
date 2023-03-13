import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { login, loginFail } from '../../store/cart-shopping/authSlice'
import styles from './login.module.css'

export default function Login() {
    const dispatch = useDispatch()
    const error = useSelector((state) => state.auth.error)

    const onSubmit = async (values, { setSubmitting }) => {
        const { confirmpassword, ...data } = values

        try {
            const res = await axios.post(
                'http://localhost:8888/api/auth/login',
                data
            )
            res && dispatch(login(res.data))
        } catch (error) {
            dispatch(loginFail())
        }
        setSubmitting(false)
    }

    return (
        <div className='container'>
            <Header />
            <div className={styles['linehigh']}></div>
            <div className={styles['loginWrapper']}>
                <h4 className={styles['login__title']}>ĐĂNG NHẬP</h4>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validate={(values) => {
                        const errors = {}
                        if (!values.username.trim()) {
                            errors.username = 'Required'
                        }

                        if (!values.password.trim()) {
                            errors.password = 'Required'
                        }
                        return errors
                    }}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className={styles['login__info']}>
                            <div className=''>Tên đăng nhập</div>
                            <Field
                                className={styles['login__item']}
                                type='text'
                                name='username'
                            />
                            <ErrorMessage
                                className={styles['login__error']}
                                name='username'
                                component='div'
                            />

                            <div style={{ marginTop: '10px' }} className=''>
                                Mật khẩu
                            </div>
                            <Field
                                className={styles['login__item']}
                                type='password'
                                name='password'
                            />
                            <ErrorMessage
                                className={styles['login__error']}
                                name='password'
                                component='div'
                            />
                            <button
                                className={styles['login__button']}
                                type='submit'
                                disabled={isSubmitting}
                            >
                                Đăng nhập
                            </button>

                            {error && (
                                <div className={styles['login__error']}>
                                    Sai tài khoản hoặc mật khẩu
                                </div>
                            )}
                            <div className={styles['request__button']}>
                                Chưa có tài khoản ?
                                <Link to='/register'>Đăng ký</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

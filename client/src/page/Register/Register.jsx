import React, { useState } from 'react'
import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import styles from './register.module.css'

export default function Register() {
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    const onSubmit = async (values, { setSubmitting }) => {
        const { confirmpassword, ...data } = values

        try {
            const res = await axios.post(
                'http://localhost:8888/api/auth/register',
                data
            )
            res && navigate('/login')
        } catch (error) {
            setError(true)
        }
        setSubmitting(false)
    }

    return (
        <div className='container'>
            <Header />
            <div className={styles['linehigh']}></div>
            <div className={styles['registerWrapper']}>
                <h4 className={styles['register__title']}>ĐĂNG KÝ</h4>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validate={(values) => {
                        const errors = {}
                        if (!values.username.trim()) {
                            errors.username = 'Vui lòng nhập lại'
                        }

                        if (!values.password.trim()) {
                            errors.password = 'Vui lòng nhập lại'
                        }
                        if (!values.confirmPassword.trim()) {
                            errors.confirmPassword = 'Vui lòng nhập lại'
                        }

                        if (values.confirmPassword !== values.password) {
                            errors.confirmPassword = 'Mật khẩu không chính xác'
                        }
                        return errors
                    }}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className={styles['register__info']}>
                            <div className=''>Tên đăng nhập</div>
                            <Field
                                className={styles['register__item']}
                                type='text'
                                name='username'
                            />
                            <ErrorMessage
                                className={styles['register__error']}
                                name='username'
                                component='div'
                            />

                            <div style={{ marginTop: '10px' }} className=''>
                                Mật khẩu
                            </div>
                            <Field
                                className={styles['register__item']}
                                type='password'
                                name='password'
                            />
                            <ErrorMessage
                                className={styles['register__error']}
                                name='password'
                                component='div'
                            />
                            <div style={{ marginTop: '10px' }} className=''>
                                Nhập lại mật khẩu
                            </div>
                            <Field
                                className={styles['register__item']}
                                type='password'
                                name='confirmPassword'
                            />
                            <ErrorMessage
                                className={styles['register__error']}
                                name='confirmPassword'
                                component='div'
                            />
                            <button
                                className={styles['register__button']}
                                type='submit'
                                disabled={isSubmitting}
                            >
                                Đăng ký
                            </button>
                            {error && (
                                <div className={styles['register__error']}>
                                    Tài khoản, mật khẩu không hợp lệ
                                </div>
                            )}
                            <div className={styles['request__button']}>
                                Đã có tài khoản ?
                                <Link to='/login'>Đăng nhập</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

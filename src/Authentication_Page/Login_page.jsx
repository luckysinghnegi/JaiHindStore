import React, { useState } from 'react'
import style from "./Login_page.module.css"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import auth from '../Firebase_data_base/Firebase'

function Login_page() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const register_user = async (e) => {
        e && e.preventDefault && e.preventDefault()
        setError('')
        setSuccess('')

        if (!email || !password) {
            setError('Please enter email and password')
            return
        }

        setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            console.log('User created:', userCredential.user)
            setSuccess('Account created successfully')
            // Reset fields
            setName('')
            setEmail('')
            setPassword('')
        } catch (err) {
            console.error('Registration error:', err.message)
            // setError(err?.message == String("Firebase: Error (auth/email-already-in-use).D") ? "already exit" : "Registration failed")
            setError(err?.message == "Firebase: Error (auth/email-already-in-use)." ? "Account already exit" : 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={style.Login_box}>
            <div>
                <div>Login Page</div>

                {error && (
                    <div style={{ color: 'red', marginTop: 12 }}>{error}</div>
                )}
                {success && (
                    <div style={{ color: 'green', marginTop: 12 }}>{success}</div>
                )}

                <div className={style.Users_Details}>
                    <div className={style.Name_section}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={style.Email_section}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={style.User_password}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className={style.Submit_Btn}>
                    <button
                        className={style.sign_btn}
                        onClick={register_user}
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login_page
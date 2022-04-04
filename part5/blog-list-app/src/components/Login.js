import { useState } from 'react'

const Login = ({ onSubmit }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const onSubmitForm = (event) => {
        event.preventDefault()
        onSubmit(username, password)
    }

    return (
        <form id='login-form' onSubmit={onSubmitForm}>
            <label>
                username:
                <input type='text' id='username' onChange={({ target }) => setUsername(target.value)} />
            </label>
            <br />
            <label>
                password:
                <input type='password' id='password' onChange={({ target }) => setPassword(target.value)} />
            </label>
            <br />
            <button id='login' type='submit'>Login</button>
        </form>
    )
}

export default Login
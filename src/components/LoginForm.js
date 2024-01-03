import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'



const LoginForm = ({ setError, setToken, show, setPage, token, }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // user logins
    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                setError(error.graphQLErrors[0].message)
            } else {
                setError("An error occurred")
            }
        }
    })

    // set token
    useEffect(() => {
        if ( result.data ) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('book-user-token', token)
            localStorage.setItem('favoriteGenre', result.data.login.user.favoriteGenre)
            setPage('authors')
        }
    }, [result.data])


    const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
    }

    if (!show) {
        return null
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username <input value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm

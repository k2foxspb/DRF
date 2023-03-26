import React from 'react';
import ProjectList from './components/Projects.js';
import UserList from "./components/Users.js";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import axios from 'axios'
import LoginForm from "./components/Auth";
import Cookies from 'universal-cookie';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'token': ''
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())

    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password
        })
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }


    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                this.setState(
                    {'users': response.data}
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project/', {headers})
            .then(response => {
                this.setState(
                    {'projects': response.data}
                )
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()

    }

    render() {
        return (
            <div className={App}>
                <BrowserRouter>

                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                {this.is_authenticated() ? <button
                                    onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path='/' Component={() => <UserList items={this.state.users}/>}/>
                        <Route path='/projects'
                               Component={() => <ProjectList items={this.state.projects}/>}/>
                        <Route exact path='/login' Component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>

                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
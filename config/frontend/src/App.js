import React from 'react';
import ProjectList from './components/Projects.js';
import UserList from "./components/Users.js";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import axios from 'axios'
import LoginForm from "./components/Auth";
import Cookies from 'universal-cookie';
import ProjectForm from "./components/ProjectForm";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [], 'projects': [], 'token': ''
        }
    }

    createProject(name, id) {
        const headers = this.get_headers()
        const data = {id: id,name: name}
        axios.post('http://127.0.0.1:8000/api/project/', data, {headers})
            .then(response => {
                let new_project = response.data
                const id = this.state.projects.filter((item) => item.id ===
                    new_project.id)[0]
                new_project.id = id
                this.setState({
                    projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/project/${id}/`, {headers})
            .then(response => {
                this.setState({
                    projects: this.state.projects.filter((item) => item.id !== id)
                })
            }).catch(error => console.log(error))
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
            username: username, password: password
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
        axios.get(`http://127.0.0.1:8000/api/users/`, {headers})
            .then(response => {
                this.setState({'users': response.data})
            }).catch(error => console.log(error))
        axios.get(`http://127.0.0.1:8000/api/project/`, {headers})
            .then(response => {
                this.setState({'projects': response.data})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()

    }

    render() {
        return (<div className="App">
            <BrowserRouter>

                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Users</Link>
                        </li>
                        <li>
                            <Link to='/project'>Project</Link>
                        </li>
                        <li>
                            {this.is_authenticated() ? <button
                                onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path='/' Component={() => <UserList items={this.state.users}/>}/>
                    <Route path='/project/create' Component={() => <ProjectForm
                        createProject={(name, id) => this.createProject(name, id)}/>}/>
                    <Route path='/project'
                           Component={() => <ProjectList items={this.state.projects}
                                                         deleteProject={(id) => this.deleteProject(id)}/>}/>
                    <Route exact path='/login' Component={() => <LoginForm
                        get_token={(username, password) => this.get_token(username, password)}/>}/>

                </Routes>
            </BrowserRouter>
        </div>)
    }
}

export default App;
import React from 'react';
import ProjectList from './components/Projects.js';
import UserList from "./components/Users.js";
import {BrowserRouter, HashRouter, Link, Route, Routes} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props)
        const user1 = {id: 1, name: 'Грин', birthday_year: 1880}
        const user2 = {id: 2, name: 'Пушкин', birthday_year: 1799}
        const users = [user1, user2]
        const project1 = {id: 1, name: 'Алые паруса', user: user1}
        const project2 = {id: 2, name: 'Золотая цепь', user: user1}
        const project3 = {id: 3, name: 'Пиковая дама', user: user2}
        const project4 = {id: 4, name: 'Руслан и Людмила', user: user2}
        const projects = [project1, project2, project3, project4]
        this.state = {
            'users': users,
            'projects': projects,
        }
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                        <Route exact path='/' component={() => <UserList items={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList items={this.state.projects}/>}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;

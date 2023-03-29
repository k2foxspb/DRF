import React from 'react'
import {Link} from "react-router-dom";

const ProjectsItem = ({item, deleteProject}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
                <button onClick={() => deleteProject(item.id)}
                        type='button'>Delete
                </button>
            </td>
        </tr>
    )
}


const ProjectList = ({items, deleteProject}) => {
    return (
        <div>
            <table>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Users
                    </th>
                    <th></th>
                </tr>
                {items.map((item) => <ProjectsItem item={item} deleteProject={deleteProject}/>)}
            </table>
            <Link to='/project/create'>Create</Link>
        </div>
    )
}

export default ProjectList
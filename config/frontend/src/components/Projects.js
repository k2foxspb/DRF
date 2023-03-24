import React from 'react'

const ProjectsItem = ({item}) => {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.repository}</td>
            <td>{item.description}</td>
        </tr>
    )
}


const ProjectList = ({items}) => {
    return (
        <table>
            <th>
                Project name
            </th>
            <th>
                Users
            </th>
            <th>
                Project description
            </th>
            {items.map((item) => <ProjectsItem item={item}/>)}
        </table>
    )
}

export default ProjectList
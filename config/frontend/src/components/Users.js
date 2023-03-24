import React from 'react'

const ProjectsItem = ({item}) => {
    return (
        <tr>
            <td>{item.user_name}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
        </tr>
    )
}


const ProjectList = ({items}) => {
    return (
        <table>
            <th>
                first name
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
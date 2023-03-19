import React from 'react'

const UserItem = ({item}) => {
    return (
        <tr>
            <td>{item.user_name}</td>
            <td>{item.first_name}</td>
            <td>{item.email}</td>
        </tr>
    )
}


const UserList = ({items}) => {
    return (
        <table>
            <th>
                User_name
            </th>
            <th>
                First_name
            </th>
            <th>
                Email
            </th>
            {items.map((item) => <UserItem item={item}/>)}
        </table>
    )
}

export default UserList

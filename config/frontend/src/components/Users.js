import React from 'react'

const UserItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.birthday_year}</td>
        </tr>
    )
}


const UserList = ({items}) => {
    return (
        <table>
            <th>
                First name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Email
            </th>
            {items.map((item) => <UserItem item={item}/>)}
        </table>
    )
}

export default UserList

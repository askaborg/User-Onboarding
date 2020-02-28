import React from 'react'

const UserDisplay = props => {
    return (
        <div className="user-list">
            {props.userList.map((user, index) => 
                <div key={index}><p>{user.name}'s email is {user.email}</p></div>           
            )}
        </div>
    )
}

export default UserDisplay
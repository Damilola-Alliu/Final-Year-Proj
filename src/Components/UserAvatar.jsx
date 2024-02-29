import react from 'react'
import Avatar from 'react-avatar'

const UserAvatar = ({ firstname, lastname }) => {
    const initials = `${firstname.charAt(0)}${lastname.charAt(0)}`;

    return (
        <Avatar
        name= {initials}
        round = {true}
        size='40'
        />
    )
}

export default UserAvatar;
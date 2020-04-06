const users = [];

// addUser
const addUser = ({
    id,
    username,
    room
}) => {
    username = username.trim();
    room = room.trim();
    if (!username || !room) {
        return {
            error: "Username and room are required"
        }
    }
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username;
    });
    if (existingUser) {
        return {
            error: "Username is in use"
        }
    }
    const user = {
        id,
        username,
        room
    };
    users.push(user);
    return {
        user
    };
}
// removeUser
const removeUser = (id) => {
    const index = users.findIndex((user) => id === user.id);
    if (index > -1) return users.splice(index, 1)[0];

}

// getUser
const getUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index > -1) return users[index];
}
// getUsersinRoom
const getUsersInRoom = (room) => {
    const usersInRoom = users.filter((user) => user.room === room);

    return usersInRoom;
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
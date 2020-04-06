const generateMessage = (msg, username) => {
    console.log(msg);
    return {
        username,
        msg,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
}
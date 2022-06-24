const socket = io()

//Capturamos los elementos del dom con sus id:
const messageForm = document.getElementById('messageForm')
const usernameInput = document.getElementById('usernameInput')
const messageInput = document.getElementById('messageInput')
const messagesPool = document.getElementById('messagesPool')

const sendMessage = (messageInfo) => {
    socket.emit('client:message', messageInfo)
}

const renderMessages = (messageInfo) => {
    console.log('MessageInfo', messageInfo)
    const html = messageInfo.map(msgInfo =>{
        return(`<div>
                <strong>${msgInfo.username}</strong>
                <em>${msgInfo.message}</em>
            </div>`)
    }).join(" ")
    console.log('HTML', html)
    messagesPool.innerHTML = html
}

const submitHandler = (event) => {
    event.preventDefault()
    const messageInfo = { username: usernameInput.value, message: messageInput.value }

    sendMessage(messageInfo)
}

messageForm.addEventListener('submit', submitHandler)

socket.on('server:mensajes', renderMessages)
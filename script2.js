// script.js

// Función para agregar un mensaje al chat
function appendMessage(text, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container ${sender}';

    const message = document.createElement('div');
    message.className = 'message ${sender}';

    const messageText = document.createElement('span');
    messageText.className = 'message-text';
    messageText.textContent = text;

    const messageTime = document.createElement('span');
    messageTime.className = 'message-time';
    messageTime.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑';

    // Evento de eliminación del mensaje
    deleteBtn.addEventListener('click', function () {
        messageContainer.remove();
        saveMessages(); // Guardar cambios después de eliminar
    });

    // Agregar texto y hora al mensaje
    message.appendChild(messageText);
    message.appendChild(messageTime);
    message.appendChild(deleteBtn);

    // Agregar el mensaje al contenedor
    messageContainer.appendChild(message);

    // Agregar el mensaje al chat
    document.getElementById('chat-box').appendChild(messageContainer);

    // Desplazar hacia abajo el chat
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;

    saveMessages(); // Guardar cambios después de agregar un nuevo mensaje
}

function appendFileMessage(fileName, sender) {
    console.log('fileName', fileName);
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container ${sender}';

    const message = document.createElement('div');
    message.className = 'message ${sender}';

    const messageText = document.createElement('span');
    messageText.className = 'message-text';
    messageText.textContent = `Archivo: ${fileName}`;
    messageText.style.color = 'blue';
    messageText.style.textDecoration = 'underline';
    messageText.style.cursor = 'pointer';
    messageText.addEventListener('click', function () {
        const fileContent = localStorage.getItem(fileName);
        const link = document.createElement('a');
        link.href = fileContent;
        link.download = fileName;
        link.click();
    });

    const messageTime = document.createElement('span');
    messageTime.className = 'message-time';
    messageTime.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑';

    // Evento de eliminación del mensaje
    deleteBtn.addEventListener('click', function () {
        messageContainer.remove();
        localStorage.removeItem(fileName); // Eliminar archivo del localStorage
        saveMessages(); // Guardar cambios después de eliminar
    });

    message.appendChild(messageText);
    message.appendChild(messageTime);
    message.appendChild(deleteBtn);

    messageContainer.appendChild(message);

    document.getElementById('chat-box').appendChild(messageContainer);

    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;


    saveMessages();
}

// Función para guardar mensajes en localStorage
function saveMessages() {
    const messages = [];
    const containers = document.querySelectorAll('.message-container');
    containers.forEach(container => {
        const chatElement = container.querySelector('.message-text');
        const text = chatElement.style.color === 'blue' ? chatElement.textContent.replaceAll('Archivo: ', '') : chatElement.textContent;

        console.log('text', text);
        const sender = container.classList.contains('sent') ? 'sent' : 'received';
        const type = chatElement.style.color === 'blue' ? 'file' : 'text';
        messages.push({text, sender, type});
    });
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Función para cargar mensajes desde localStorage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages'));
    if (messages) {
        messages.forEach(msg => {
            if (msg.type === 'text') {
                appendMessage(msg.text, msg.sender);
            } else {
                appendFileMessage(msg.text, msg.sender);
            }
        });
    }
}

// Cargar mensajes al iniciar
loadMessages();

// Evento para enviar un mensaje
document.getElementById('sendChatBtn').addEventListener('click', function () {
    const inputField = document.getElementById('message-input');
    const text = inputField.value.trim();

    if (text) {
        appendMessage(text, 'sent'); // Mensaje enviado
        inputField.value = ''; // Limpiar campo después del envío
        // appendMessage("", 'received'); // Simular respuesta recibida
    }
});

// Manejo del botón de emoji
document.getElementById('emoji-button').addEventListener('click', function () {
    const emojiPicker = document.getElementById('emojiPicker');
    emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block'; // Alternar visibilidad del selector de emojis
});

// Agregar emojis al campo de entrada
document.querySelectorAll('#emojiPicker span').forEach(emoji => {
    emoji.addEventListener('click', function () {
        const inputField = document.getElementById('message-input');
        inputField.value += this.textContent; // Agregar emoji al campo de entrada
        document.getElementById('emojiPicker').style.display = 'none'; // Cerrar el selector después de seleccionar un emoji
    });
});

// Mostrar indicador de escritura
const typingIndicator = document.getElementById('typing-indicator');

document.getElementById('message-input').addEventListener('input', function () {
    typingIndicator.style.display = 'block'; // Mostrar indicador al escribir

    // Ocultar el indicador después de 1 segundo si no hay más escritura
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
        typingIndicator.style.display = 'none';
    }, 1000);
});

// Manejo del botón de archivo
document.getElementById('file-button').addEventListener('click', function () {
    document.getElementById('file-input').click(); // Simular clic en el input de archivo
});

// Manejo del archivo seleccionado
document.getElementById('file-input').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const fileName = `${new Date().getTime()}_${file.name}`;
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileContent = e.target.result;
            localStorage.setItem(fileName, fileContent);
            appendFileMessage(fileName, 'sent');
        };
        reader.readAsDataURL(file);

        event.target.value = ''; // Limpiar el campo de archivo después del envío
    }
});
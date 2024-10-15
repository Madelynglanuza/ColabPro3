// Variables para el chat
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const messageText = messageInput.value;
const sendButton = document.getElementById('send-button');
const typingIndicator = document.getElementById('typing-indicator');
const fileInput = document.getElementById('file-input');
const emojiButton = document.getElementById('emoji-button');
const fileButton = document.getElementById('file-button');
const optionsButton = document.getElementById('optionsButton');
const optionsMenu = document.getElementById('optionsMenu');
const emojiPicker = document.getElementById('emojiPicker');

//Codigo para ordenar bien los mensages El emoji aparecio abajo del y no arriba.
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
    messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.style.display = 'none'; // Puedes manejar la visibilidad según sea necesario
    deleteBtn.textContent = '🗑';
    
    message.appendChild(messageText);
    message.appendChild(messageTime);
    message.appendChild(deleteBtn);
    messageContainer.appendChild(message);
    
    document.getElementById('chat-box').appendChild(messageContainer);
}
// Funcion para eliminar los mensajes que no se pueden eliminar
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const messageContainer = event.target.parentElement.parentElement;
        messageContainer.remove();
    }
});
// Al enviar un nuevo mensaje
document.getElementById('sendChatBtn').addEventListener('click', function() {
    const inputField = document.getElementById('message-input');
    const text = inputField.value;
    
    if (text) {
        appendMessage(text, 'sent'); // 'sent' o 'received' según corresponda
        inputField.value = ''; // Limpiar campo después del envío
    }
});

// Crear el contenedor del mensaje enviado
const messageContainer = document.createElement('div');
messageContainer.classList.add('message-container', 'sent');
const messageElement = document.createElement('div');
messageElement.classList.add('message', 'sent');
// Crear el contenedor del mensaje recibido
const receivedMessageContainer = document.createElement('div');
receivedMessageContainer.classList.add('message-container', 'received');
const receivedMessageElement = document.createElement('div');
receivedMessageElement.classList.add('message', 'received');
// Crear el texto del mensaje
const textElement = document.createElement('span');
textElement.classList.add('message-text');
textElement.textContent = messageText;
// Crear el tiempo del mensaje
const timeElement = document.createElement('span');
timeElement.classList.add('message-time');
timeElement.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Agregar texto y tiempo al contenedor del mensaje
messageElement.appendChild(textElement);
messageElement.appendChild(timeElement);
messageContainer.appendChild(messageElement);
// Agregar el mensaje al chat
document.getElementById('chat-box').appendChild(messageContainer);

const continueButton = document.querySelector('.continue-button');
const backButton = document.querySelector('.back-button');
const fullscreenButton = document.querySelector('.fullscreen-button');
// Obtener referencias a los elementos del DOM
const chatInput = document.getElementById('chatInput');
const chatBoxElement = document.getElementById('chatBox');
const sendChatBtn = document.getElementById('sendChatBtn');
// Obtener referencias a los elementos del DOM
const teamMembersTable = document.getElementById('teamMembersTable');
const memberNameInput = document.getElementById('memberName');
const memberEmailInput = document.getElementById('memberEmail');
const memberRoleSelect = document.getElementById('memberRole');
const addMemberButton = document.getElementById('addMemberButton');
const notification = document.getElementById('notification');
// Obtener referencias a los elementos del DOM
const taskList = document.querySelector('.tasks');
const searchBar = document.querySelector('.search-bar');
const progressPercentage = document.querySelector('.progress-percentage');
const timelineEvents = document.querySelector('.timeline-events');
const activityLogElement = document.querySelector('.log');
const addNewTaskButton = document.querySelector('.add-task');
// Otrosss



let typingTimeout;
let messages = [];
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let timelineEvent = JSON.parse(localStorage.getItem('timelineEvents')) || [];
let activityLog = JSON.parse(localStorage.getItem('activityLog')) || [];

// Cargar historial de chat desde el localStorage
loadChatHistory();


// Función para enviar un mensaje
function sendMessage(message) {
    if (message.trim()) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        console.log('Mensaje enviado:', message);
        messageInput.value = ''; // Limpiar el input
        chatBox.scrollTop = chatBox.scrollHeight; // Desplazamiento automático
        saveMessageToHistory(message);
        notifyNewMessage();
    }
}

// Notificación de nuevos mensajes
function notifyNewMessage() {
    
}

// Indicador de escritura
messageInput.addEventListener('input', () => {
    typingIndicator.style.display = 'block';
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        typingIndicator.style.display = 'none';
    }, 1000); // Ocultar después de 1 segundo
});

// Envío de archivos
fileButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = 'Archivo enviado: ${file.name}';
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        saveMessageToHistory('[Archivo enviado: ${file.name}]');
        notifyNewMessage();
    }
});


// Funciones para manejar el historial de chat
function saveMessageToHistory(message) {
    messages.push(message);
    localStorage.setItem('chatHistory', JSON.stringify(messages));
}
// Función para regresar a la página anterior
function goBack() {
    window.history.back(); // O redirige a una URL específica
}



function loadChatHistory() {
    const storedHistory = localStorage.getItem('chatHistory');
    if (storedHistory) {
        messages = JSON.parse(storedHistory);
        renderChatHistory();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox'); // Asegúrate de que el ID coincida

    function renderChatHistory() {
        messages.forEach((message) => {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = message;
            chatBox.appendChild(messageDiv); // Aquí es donde se produce el error
        });
    }

    // Llama a la función renderChatHistory en el momento adecuado
    renderChatHistory();
});
function renderChatHistory() {
    messages.forEach((message) => {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
    });
    chatBox.scrollTop = chatBox.scrollTop = chatBox.scrollHeight;
}

// Función para manejar la selección de archivos
fileButton.addEventListener('click', () => {
    fileInput.click(); // Simular un clic en el input de archivo
});

messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage(messageInput.value);
    }
});
messageInput.addEventListener('input', () => {
    typingIndicator.style.display = 'block';
    clearTimeout(typingTimeout); 
    typingTimeout = setTimeout(() => {
        typingIndicator.style.display = 'none';
    }, 1000); // ocultal despues de un segundo
});
fileButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = 'Archivo enviado: ${file.name}';
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        saveMessageToHistory('[Archivo enviado: ${file.name}]');
        notifyNewMessage();
    }
});

// Boton Pantalla completa
fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen(); // Solicita pantalla completa
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen(); // Sale del modo de pantalla completa
        }
    }
});

// Codigo Nuevo 
document.addEventListener('DOMContentLoaded', () => {
    const sendChatBtn = document.getElementById('sendChatBtn');
    const messageInput = document.getElementById('message-input');
    const chatBox = document.getElementById('chat-box');
    const fileInput = document.getElementById('file-input');
    const emojiButton = document.getElementById('emoji-button');
    const fileButton = document.getElementById('file-button');
    const typingIndicator = document.getElementById('typing-indicator');

    sendChatBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'sent');
            messageElement.textContent = message;
            chatBox.appendChild(messageElement);
            messageInput.value = '';
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim() !== '') {
            typingIndicator.style.display = 'block';
        } else {
            typingIndicator.style.display = 'none';
        }
    });

    emojiButton.addEventListener('click', () => {
        messageInput.value += '😊';
        messageInput.focus();
    });
    //Codigo nuevo para los emojis que se habian borrado
    // script.js

// Función para agregar un mensaje al chat
function appendMessage(text, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container ${sender}';
    
    const message = document.createElement('div');
    message.className = 'message ${sender}';
    
    const messageText = document.createElement('span');
    messageText.textContent = text;

    const messageTime = document.createElement('span');
    messageTime.className = 'message-time';
    messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Agregar texto y hora al mensaje
    message.appendChild(messageText);
    message.appendChild(messageTime);
    
    // Agregar el mensaje al contenedor
    messageContainer.appendChild(message);
    
    // Agregar el mensaje al chat
    document.getElementById('chat-box').appendChild(messageContainer);
    
   // Desplazar hacia abajo el chat
   document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

// Evento para enviar un mensaje
document.getElementById('sendChatBtn').addEventListener('click', function() {
   const inputField = document.getElementById('message-input');
   const text = inputField.value.trim();
   
   if (text) {
       appendMessage(text, 'sent'); // Mensaje enviado
       inputField.value = ''; // Limpiar campo después del envío
       // Simular respuesta recibida
       appendMessage("¡Hola! Estoy bien, gracias. ¿Y tú?", 'received');
   }
});

// Manejo del botón de emoji
document.getElementById('emoji-button').addEventListener('click', function() {
    const emojiPicker = document.getElementById('emojiPicker');
    emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block'; // Alternar visibilidad del selector de emojis
});

// Agregar emojis al campo de entrada
document.querySelectorAll('#emojiPicker span').forEach(emoji => {
    emoji.addEventListener('click', function() {
        const inputField = document.getElementById('message-input');
        inputField.value += this.textContent; // Agregar emoji al campo de entrada
        document.getElementById('emojiPicker').style.display = 'none'; // Cerrar el selector después de seleccionar un emoji
    });
});

// Mostrar indicador de escritura

document.getElementById('message-input').addEventListener('input', function() {
    typingIndicator.style.display = 'block'; // Mostrar indicador al escribir

    // Ocultar el indicador después de 1 segundo si no hay más escritura
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
        typingIndicator.style.display = 'none';
    }, 1000);
});

    fileButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        // Aquí puedes manejar la subida del archivo
        console.log('Archivo seleccionado:', fileInput.files[0]);
    });
     // Funcionalidad para mostrar el selector de emojis
     emojiButton.addEventListener('click', () => {
        emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block';
    });

    // Funcionalidad para agregar emojis al input
    emojiPicker.querySelectorAll('span').forEach(emoji => {
        emoji.addEventListener('click', () => {
            messageInput.value += emoji.textContent; // Agregar emoji al input
            messageInput.focus();
            emojiPicker.style.display = 'none'; // Cerrar el selector de emojis
        });
    });
     // Funcionalidad para mostrar el menú de opciones
     optionsButton.addEventListener('click', () => {
        optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Funcionalidad para buscar mensajes
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const messages = chatBox.querySelectorAll('.message');
        messages.forEach(msg => {
            if (msg.textContent.toLowerCase().includes(searchTerm)) {
                msg.style.display = 'block';
            } else {
                msg.style.display = 'none';
            }
        });
    });

    // Funcionalidad para eliminar mensajes
    document.getElementById('deleteMessages').addEventListener('click', () => {
        const messages = chatBox.querySelectorAll('.message');
        messages.forEach(msg => {
            chatBox.removeChild(msg);
        });
        optionsMenu.style.display = 'none';
    });
     // Funcionalidad para eliminar archivos (simulada)
     document.getElementById('deleteFiles').addEventListener('click', () => {
        alert('Funcionalidad para eliminar archivos no implementada.');
        optionsMenu.style.display = 'none';
    });

    // Funcionalidad para video llamada
    document.getElementById('videoCall').addEventListener('click', () => {
        alert('Iniciando video llamada...');
        optionsMenu.style.display = 'none';
    });

    // Funcionalidad para llamada normal
    document.getElementById('audioCall').addEventListener('click', () => {
        alert('Iniciando llamada normal...');
        optionsMenu.style.display = 'none';
    });
    document.getElementById('sendChatBtn').addEventListener('click', function() {
        const messageInput = document.getElementById('message-input');
        const messageText = messageInput.value.trim();
        
        if (messageText) {
        // Crear un nuevo div para el mensaje enviado
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message sent';
        messageDiv.textContent = messageText;

        // Agregar el mensaje al chat
        document.getElementById('chat-box').appendChild(messageDiv);

        // Limpiar el campo de entrada
        messageInput.value = '';

        // Simular la recepción de un mensaje (puedes reemplazar esto con lógica real)
        setTimeout(() => {
            const receivedMessageDiv = document.createElement('div');
            receivedMessageDiv.className = 'message received';
            receivedMessageDiv.textContent = 'Este es un mensaje de respuesta.';

            // Agregar el mensaje recibido al chat
            document.getElementById('chat-box').appendChild(receivedMessageDiv);
        }, 1000); // Simula un retraso de 1 segundo para recibir el mensaje
    }
});
});
// Función para cargar mensajes desde localStorage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(message => {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container', message.type);

        const messageElement = document.createElement('div');
        messageElement.classList.add('message', message.type);

        const textElement = document.createElement('span');
        textElement.classList.add('message-text');
        textElement.textContent = message.text;

        const timeElement = document.createElement('span');
        timeElement.classList.add('message-time');
        timeElement.textContent = message.time;

        // Crear el botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = '🗑';
        deleteButton.style.display = 'none'; // Ocultar el botón de eliminar por defecto

        // Agregar evento para eliminar el mensaje
        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Evitar que el clic en el botón cierre el mensaje
            messageContainer.remove(); // Elimina el contenedor del mensaje
            removeMessageFromStorage(message.text); // Eliminar del localStorage
        });

        // Agregar evento para mostrar el botón de eliminar al hacer clic en el mensaje
        messageElement.addEventListener('click', function() {
            deleteButton.style.display = deleteButton.style.display === 'none' ? 'inline' : 'none'; // Alternar visibilidad
        });

        // Agregar texto, tiempo y botón de eliminar al contenedor del mensaje
        messageElement.appendChild(textElement);
        messageElement.appendChild(timeElement);
        messageElement.appendChild(deleteButton); // Agregar botón de eliminar
        messageContainer.appendChild(messageElement);

        // Agregar el mensaje al chat
        document.getElementById('chat-box').appendChild(messageContainer);
    });
}

// Función para eliminar un mensaje del localStorage
function removeMessageFromStorage(messageText) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const updatedMessages = messages.filter(message => message.text !== messageText);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
}

// Cargar mensajes predeterminados
function loadDefaultMessages() {
    const defaultMessages = [
        { text: "", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'sent' },
        { text: "", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'received' }
    ];

    defaultMessages.forEach(message => {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        if (!messages.some(m => m.text === message.text)) { // Evitar duplicados
            messages.push(message);
            localStorage.setItem('messages', JSON.stringify(messages));
        }
    });
}

// Función para enviar un mensaje
document.getElementById('sendChatBtn').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value;

    // Verifica que el campo de entrada no esté vacío
    if (messageText.trim() !== "") {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Crear el contenedor del mensaje enviado
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container', 'sent');

        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'sent');

        // Crear el texto del mensaje
        const textElement = document.createElement('span');
        textElement.classList.add('message-text');
        textElement.textContent = messageText; // Usar el texto del input

        // Crear el tiempo del mensaje
        const timeElement = document.createElement('span');
        timeElement.classList.add('message-time');
        timeElement.textContent = currentTime; // Almacena la hora en el momento del envío

        // Crear el botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = '🗑'; // Icono de papelera
        deleteButton.style.display = 'none'; // Ocultar el botón de eliminar por defecto

        // Agregar evento para eliminar el mensaje
        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Evitar que el clic en el botón cierre el mensaje
            messageContainer.remove(); // Elimina el contenedor del mensaje
            removeMessageFromStorage(messageText); // Eliminar del localStorage
        });

        // Agregar evento para mostrar el botón de eliminar al hacer clic en el mensaje
        messageElement.addEventListener('click', function() {
            deleteButton.style.display = deleteButton.style.display === 'none' ? 'inline' : 'none'; // Alternar visibilidad
        });

        // Agregar texto, tiempo y botón de eliminar al contenedor del mensaje
        messageElement.appendChild(textElement);
        messageElement.appendChild(timeElement);
        messageElement.appendChild(deleteButton); // Agregar botón de eliminar
        messageContainer.appendChild(messageElement);

        // Agregar el mensaje al chat
        document.getElementById('chat-box').appendChild(messageContainer);

        // Guardar el mensaje en localStorage
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ text: messageText, time: currentTime, type: 'sent' });
        localStorage.setItem('messages', JSON.stringify(messages));

        // Limpiar el input
        messageInput.value = '';
    }
});

// Cargar mensajes al inicio
window.onload = function() {
    loadDefaultMessages(); // Cargar mensajes predeterminados
    loadMessages(); // Cargar mensajes desde localStorage
};
// Aqui termina

// Comienza el otro de los emojis
// Opcional: permitir enviar mensajes con la tecla Enter
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendChatBtn.click(); // Simular clic en el botón de enviar
    }
});

// Array para almacenar los proyectos
let projects = [];

// Array para almacenar los miembros del equipo
let teamMembers = [];

// Evento para mostrar/ocultar el formulario de nuevo proyecto
document.getElementById('newProjectBtn').addEventListener('click', toggleNewProjectForm);

// Evento para enviar el formulario de nuevo proyecto
document.addEventListener('DOMContentLoaded', () => {
    // Cargar proyectos al iniciar
    loadProjects();
});
// Función para cargar proyectos desde la API
function loadProjects() {
    fetch('/api/projects')
        .then(response => response.json())
        .then(data => {
            projects = data; // Guardar proyectos en el array
            displayProjects(); // Mostrar proyectos en la tabla
        })
        .catch(error => console.error('Error al cargar proyectos:', error));
}

// Función para mostrar los proyectos en la tabla
function displayProjects() {
    const projectsTableBody = document.querySelector('#projectsTable tbody');
    projectsTableBody.innerHTML = ''; // Limpiar la tabla

    projects.forEach((project, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.title}</td>
            <td>${project.description}</td>
            <td><span class="status ${project.status}">${project.status === 'completed' ? 'Completado' : 'En curso'}</span></td>
            <td>${project.owners.join(', ')}</td>
            <td>Inicio: ${project.startDate}<br>Fin: ${project.endDate}</td>
            <td>
                <button onclick="viewProjectDetails('project-details.html?id=${project.id}')">Ver Detalles</button>
                <button onclick="editProject(${index})">Editar</button>
                <button onclick="deleteProject(${index})">Eliminar</button>
            </td>
        `;
        projectsTableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = 'Tu mensaje aquí';
    
    ChatBox.appendChild(messageDiv);
});


// Función para mostrar/ocultar el formulario para crear un nuevo proyecto
function toggleNewProjectForm() {
    const form = document.getElementById('newProjectForm');
    form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
}

// Funcion para que se ejecute cuando cuando el usuario envie el formulariode creacion de proyectos

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createProjectForm');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evitar el envío por defecto del formulario

            const formData = new FormData(form);
            const data = {
                title: formData.get('title'),
                description: formData.get('description'),
                owner_id: formData.get('owner_id')
            };

            try {
                const response = await fetch('/projects.html', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    // Redirigir a la página de proyectos
                    window.location.href = '/projects.html'; // Asegúrate de que esta ruta sea correcta
                } else {
                    const errorData = await response.json();
                    alert(errorData.message); // Mostrar mensaje de error
                }
            } catch (error) {
                console.error('Error al crear el proyecto:', error);
                alert('Error al crear el proyecto: ' + error.message);
            }
        });
    }
});
// Función para crear un nuevo proyecto
function createNewProject() {
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const ownerId = document.getElementById('projectOwnerId').value;

    // Validar que los campos no estén vacíos
    if (!title || !description || !ownerId) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    if (title.length < 3) {
        alert('El título debe tener al menos 3 caracteres.');
        return;
    }

    const submitButton = document.getElementById('createProjectBtn');
    submitButton.disabled = true;

    fetch('/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            owner_id: ownerId
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la creación del proyecto');
        }
        return response.json();
    })
    .then(data => {
        console.log('Proyecto creado:', data);
        loadProjects(); // Recargar la lista de proyectos

        // Mostrar mensaje de éxito
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block'; // Mostrar el mensaje
        setTimeout(() => {
            successMessage.style.display = 'none'; // Ocultar el mensaje después de 3 segundos
        }, 3000);
        
        // Limpiar el formulario
        document.getElementById('projectTitle').value = '';
        document.getElementById('projectDescription').value = '';
        document.getElementById('projectOwnerId').value = '';
        toggleNewProjectForm(); // Ocultar el formulario después de crear el proyecto
    })
    .catch(error => {
        console.error('Error al crear el proyecto:', error);
        alert('No se pudo crear el proyecto. Intenta de nuevo más tarde.');
    })
    .finally(() => {
        submitButton.disabled = false; // Habilitar el botón nuevamente
    });
}
document.getElementById('createProjectForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Obtén los valores del formulario
    var projectName = document.getElementById('projectName').value;
    var projectDescription = document.getElementById('projectDescription').value;
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var budget = document.getElementById('budget').value;
    var collaborators = document.getElementById('collaboratorList').textContent;
    var status = document.getElementById('status').value;
  
    // Aquí puedes enviar los datos al servidor para crear el proyecto
  
    // Muestra el mensaje de éxito
    document.getElementById('successMessage').classList.remove('hidden');
  
    // Limpia el formulario
    document.getElementById('createProjectForm').reset();
  });

// Función para filtrar proyectos
function filterProjects() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const projectsTable = document.getElementById('projectsTable');
    const rows = projectsTable.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) { // Comenzar desde 1 para omitir el encabezado
        const cells = rows[i].getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchInput)) {
                found = true;
                break;
            }
        }

        rows[i].style.display = found ? '' : 'none'; // Mostrar u ocultar la fila
    }
}

function showDetails(id) {


    window.location.href = 'project-detalles.html?id=' + id;
}


// Función para editar un proyecto
function editProject(row, index) {
    const titleInput = document.getElementById(`title-${index}`);
    const descriptionInput = document.getElementById(`desc-${index}`);
    const statusInput = document.getElementById(`status-${index}`);
    const startDateInput = document.getElementById(`startDate-${index}`);
    const endDateInput = document.getElementById(`endDate-${index}`);
    const editButton = document.getElementById(`edit-${index}`);
    const originalEditButtonClick = editButton.onclick;

    const inputs = [titleInput, descriptionInput, statusInput, startDateInput, endDateInput];

    inputs.forEach(input => input.disabled = false);
    editButton.textContent = 'Guardar';

    editButton.onclick = function() {
        try {
            saveEdit(index, titleInput.value, descriptionInput.value, statusInput.value, startDateInput.value, endDateInput.value);

            inputs.forEach(input => input.disabled = true);
            editButton.textContent = 'Editar';
            editButton.onclick = originalEditButtonClick;
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Error saving project. Please try again.');
        }
    };
}

function saveEdit(index, title, description, status, startDate, endDate) {
    // localStorage.getItem('projects')
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    console.log(projects[index]);

    projects[index].title = title;
    projects[index].description = description;
    projects[index].status = status;
    projects[index].startDate = startDate;
    projects[index].endDate = endDate;

    localStorage.setItem('projects', JSON.stringify(projects));
}

// Función para actualizar un proyecto
function updateProject() {
    const title = document.getElementById('editProjectTitle').value;
    const description = document.getElementById('editProjectDescription').value;

    // Aquí se puede agregar lógica para actualizar el proyecto en la tabla
    // Por ejemplo, se puede buscar la fila correspondiente y actualizarla

    toggleEditProjectForm(); // Ocultar el formulario después de actualizar
}

// Función para eliminar un proyecto
function deleteProject(button) {
    const row = button.parentNode.parentNode; // Obtener la fila del botón
    row.parentNode.removeChild(row); // Eliminar la fila de la tabla
}

// Función para alternar la visibilidad del formulario de edición
function toggleEditProjectForm() {
    const form = document.getElementById('editProjectForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}
// Función para agregar un miembro del equipo
function addMember() {
    const memberName = memberNameInput.value.trim();
    const memberEmail = memberEmailInput.value.trim();
    const memberRole = memberRoleSelect.value;

    if (memberName && memberEmail) {
        const newRow = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = memberName;
        newRow.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = memberEmail;
        newRow.appendChild(emailCell);

        const roleCell = document.createElement('td');
        roleCell.textContent = memberRole;
        newRow.appendChild(roleCell);

        const actionsCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            newRow.remove();
            showNotification('Miembro eliminado');
        });
        actionsCell.appendChild(deleteButton);
        newRow.appendChild(actionsCell);

        teamMembersTable.getElementsByTagName('tbody')[0].appendChild(newRow);

        memberNameInput.value = '';
        memberEmailInput.value = '';
        memberRoleSelect.value = 'developer';

        showNotification('Miembro agregado');
    } else {
        showNotification('Por favor, completa todos los campos', true);
    }
}

// Función para mostrar una notificación
function showNotification(message, isError = false) {
    notification.textContent = message;
    notification.style.display = 'block';
    notification.classList.toggle('error', isError);

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Agregar evento al botón de agregar miembro
addMemberButton.addEventListener('click', addMember);

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Función para editar un miembro
function editMember(index) {
    const member = teamMembers[index];
    document.getElementById('memberName').value = member.name;
    document.getElementById('memberEmail').value = member.email;
    document.getElementById('memberRole').value = member.role;
    // Aquí puedes agregar lógica para actualizar el miembro en el array
}

// Función para eliminar un miembro
function removeMember(index) {
    teamMembers.splice(index, 1); // Eliminar del array
    displayTeamMembers(); // Actualizar la tabla
    showNotification('Miembro eliminado con éxito.');
}
// Lógica para manejar el calendario y las tareas
const calendarBody = document.querySelector('.calendar-body');
const tasksContainer = document.querySelector('.tasks');
const newTaskInput = document.querySelector('.new-task');
const addTaskButton = document.querySelector('.add-task');
const searchInput = document.querySelector('.search-bar');
const taskPrioritySelect = document.querySelector('.task-priority');

// Funciones para manejar el calendario
function renderCalendar(year, month) {
    // Lógica para renderizar el calendario
}
// Progresos

// Funciones para manejar el progreso del proyecto

function showAddTaskForm() {
    document.getElementById('addTaskForm').style.display = 'block';
}

function toggleAddTaskForm() {
    const form = document.getElementById('addTaskForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function addTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;

    if (title) {
        const task = { title, description, completed: false };
        tasks.push(task);
        activityLog.push('Tarea "${title}" agregada.');
        updateTaskList();
        updateActivityLog();
        toggleAddTaskForm(); // Ocultar formulario
    } else {
        alert("Por favor, ingresa un título para la tarea.");
    }
}

function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Limpiar la lista actual

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = '${task.title} - ${task.description}';
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Completar';
        completeButton.onclick = () => completeTask(index);
        li.appendChild(completeButton);
        taskList.appendChild(li);
    });
}

function completeTask(index) {
    tasks[index].completed = true;
    activityLog.push('Tarea "${tasks[index].title}" completada.');
    updateTaskList();
    updateActivityLog();
}

function filterTasks() {
    const searchInput = document.querySelector('.search-bar').value.toLowerCase();
    const taskList = document.getElementById('taskList');
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchInput));

    taskList.innerHTML = ''; // Limpiar la lista actual

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = '${task.title} - ${task.description}';
        taskList.appendChild(li);
    });
}

function updateActivityLog() {
    const log = document.getElementById('activityLog');
    log.innerHTML = ''; // Limpiar el registro actual

    activityLog.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        log.appendChild(li);
    });
}
// Agregar tarea
document.querySelector('.add-task').addEventListener('click', () => {
    const taskText = prompt('Ingrese el texto de la nueva tarea:');
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        updateProgressPercentage();
        logActivity('Nueva tarea "${taskText}" agregada.');
    }
});
// Login

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Aquí deberías agregar la lógica para verificar las credenciales
    // Esto es solo un ejemplo de validación
    if (username === "usuario" && password === "contraseña") {
        // Redirigir al perfil o mostrar un mensaje de éxito
        window.location.href = 'erfil.html'; // Cambia esto a la URL de tu perfil
    } else {
        document.getElementById('loginMessage').textContent = 'Credenciales incorrectas. Intenta de nuevo.';
        document.getElementById('loginMessage').style.display = 'block';
    }
});
// script.js

document.getElementById('editPerfilBtn').addEventListener('click', function() {
    // Mostrar el formulario de edición
    document.getElementById('editPerfilForm').style.display = 'block';
    // Rellenar el formulario con los datos actuales
    document.getElementById('editUserName').value = document.getElementById('userName').textContent;
    document.getElementById('editUserEmail').value = document.getElementById('userEmail').textContent;
    document.getElementById('editUserRole').value = document.getElementById('userRole').textContent.toLowerCase();
});

document.getElementById('perfilForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener los nuevos valores
    const newName = document.getElementById('editUserName').value;
    const newEmail = document.getElementById('editUserEmail').value;
    const newRole = document.getElementById('editUserRole').value;

    // Actualizar la información del perfil
    document.getElementById('userName').textContent = newName;
    document.getElementById('userEmail').textContent = newEmail;
    document.getElementById('userRole').textContent = newRole;

    // Ocultar el formulario de edición
    document.getElementById('editPerfilForm').style.display = 'none';
});
// script.js
document.getElementById('createProjectForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    // Obtén los valores del formulario
    var projectName = document.getElementById('projectName').value;
    var projectDescription = document.getElementById('projectDescription').value;
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var budget = document.getElementById('budget').value;
    var collaborators = document.getElementById('collaboratorList').textContent;
    var status = document.getElementById('status').value;

    // Aquí puedes enviar los datos al servidor para crear el proyecto
    // Por ahora, simplemente mostraremos el mensaje de éxito

    // Muestra el mensaje de éxito
    document.getElementById('successMessage').classList.remove('hidden');

    // Limpia el formulario
    document.getElementById('createProjectForm').reset();
});
// Obtener referencia al formulario
const createProjectForm = document.getElementById('createProjectForm');

// Agregar un evento de envío al formulario
createProjectForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío predeterminado del formulario

    // Obtener los valores del formulario
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const budget = document.getElementById('budget').value;
    const status = document.getElementById('status').value;

    // Obtener la lista de colaboradores
    const collaboratorList = document.getElementById('collaboratorList');
    const collaborators = [];
    for (let i = 0; i < collaboratorList.children.length; i++) {
        collaborators.push(collaboratorList.children[i].textContent);
    }

    // Aquí puedes agregar la lógica para enviar los datos del proyecto al servidor
    // o guardarlos en una base de datos local

    // Por ejemplo, puedes mostrar un mensaje de éxito
    alert('Proyecto creado exitosamente');

    // Limpiar el formulario
    createProjectForm.reset();
});

// Función para agregar colaboradores
function addCollaborator() {
    const collaboratorInput = document.getElementById('collaborators');
    const collaboratorEmail = collaboratorInput.value.trim();

    if (collaboratorEmail) {
        const collaboratorItem = document.createElement('li');
        collaboratorItem.textContent = collaboratorEmail;
        document.getElementById('collaboratorList').appendChild(collaboratorItem);
        collaboratorInput.value = '';
    }
}
// script.js

createProjectForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el envío predeterminado del formulario

    // Obtener los valores del formulario
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const budget = document.getElementById('budget').value;
    const status = document.getElementById('status').value;

    // Obtener la lista de colaboradores
    const collaboratorList = document.getElementById('collaboratorList');
    const collaborators = [];
    for (let i = 0; i < collaboratorList.children.length; i++) {
        collaborators.push(collaboratorList.children[i].textContent);
    }

    // Enviar los datos al servidor
    try {
        const response = await fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName,
                projectDescription,
                startDate,
                endDate,
                budget,
                status,
                collaborators
            })
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Mostrar mensaje de éxito
            createProjectForm.reset(); // Limpiar el formulario
        } else {
            const errorData = await response.json();
            alert(errorData.message); // Mostrar mensaje de error
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Error al crear el proyecto');
    }
});
// script.js

// Datos de ejemplo de las tareas
const task = [
    { id: 1, name: 'Tarea 1', status: 'completada', dueDate: '2024-08-15' },
    { id: 2, name: 'Tarea 2', status: 'en progreso', dueDate: '2024-08-20' },
    { id: 3, name: 'Tarea 3', status: 'pendiente', dueDate: '2024-08-25' }
];

// Función para renderizar la lista de tareas
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.name} - ${task.status} (${task.dueDate})`;
        taskList.appendChild(taskItem);
    });
    updateProgress();
}

// Función para actualizar el progreso del proyecto
function updateProgress() {
    const completedTasks = tasks.filter(task => task.status === 'completada').length;
    const totalTasks = tasks.length;
    const progress = (completedTasks / totalTasks) * 100;
    progressPercentage.textContent = `${progress.toFixed(2)}%`;
}

// Función para agregar una nueva tarea
function addTask() {
    const newTaskName = prompt('Ingresa el nombre de la nueva tarea:');
    if (newTaskName) {
        const newTask = {
            id: tasks.length + 1,
            name: newTaskName,
            status: 'pendiente',
            dueDate: '2024-08-30'
        };
        tasks.push(newTask);
        renderTasks();
        logActivity(`Nueva tarea agregada: ${newTaskName}`);
    }
}

// Función para buscar tareas
function searchTasks() {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(searchTerm)
    );
    taskList.innerHTML = '';
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.name} - ${task.status} (${task.dueDate})`;
        taskList.appendChild(taskItem);
    });
}

// Función para registrar actividades
function logActivity(message) {
    const activityItem = document.createElement('li');
    activityItem.textContent = message;
    activityLog.appendChild(activityItem);
}
// Inicializar el gráfico de progreso
const ctx = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Tarea 1', 'Tarea 2', 'Tarea 3'],
        datasets: [{
            label: 'Progreso de Tareas',
            data: [100, 60, 30], // Porcentajes de progreso de cada tarea
            backgroundColor: 'rgba(76, 175, 80, 0.6)',
            borderColor: 'rgba(76, 175, 80, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100 // Máximo 100%
            }
        }
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const currentMonth = document.querySelector('.current-month');
    const calendarBody = document.querySelector('.calendar-body');
    const addTaskButton = document.querySelector('.add-task');
    const newTaskInput = document.querySelector('.new-task');
    const taskList = document.querySelector('.tasks');
    const prevMonthButton = document.querySelector('.prev-month');
    const nextMonthButton = document.querySelector('.next-month');

    let date = new Date();

    function renderCalendar() {
        currentMonth.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        calendarBody.innerHTML = '';

        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();

        // Fill in the empty cells before the first day of the month
        for (let i = 0; i < startDay; i++) {
            const cell = document.createElement('td');
            calendarBody.appendChild(cell);
        }

        // Fill in the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement('td');
            cell.textContent = day;
            cell.addEventListener('click', function() {
                alert('Has seleccionado el día ${day}');
            });
            calendarBody.appendChild(cell);
        }

        // Fill in the empty cells after the last day of the month
        const endDay = (calendarBody.children.length + daysInMonth) % 7;
        for (let i = 0; i < (7 - endDay) % 7; i++) {
            const cell = document.createElement('td');
            calendarBody.appendChild(cell);
        }
    }

    addTaskButton.addEventListener('click', function() {
        const taskText = newTaskInput.value;
        if (taskText) {
            const li = document.createElement('li');
            li.textContent = taskText;
            taskList.appendChild(li);
            newTaskInput.value = '';
        }
    });

    prevMonthButton.addEventListener('click', function() {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', function() {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
// Fill in the empty cells after the last day of the month
const endDay = (calendarBody.children.length + daysInMonth) % 7;
for (let i = 0; i < (7 - endDay) % 7; i++) {
    const cell = document.createElement('td');
    calendarBody.appendChild(cell);
}
prevMonthButton.addEventListener('click', function() {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener('click', function() {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});
document.getElementById('registerBtn').onclick = function() {
    const form = document.getElementById('registerForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
};
// Codigo nuevo de crear nuevo proyecto y lista de proyecto
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
});

function loadProjects() {
    const projects = getProjects();
    const projectsBody = document.getElementById('projectsBody');

    projects.forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.title}</td>
            <td>${project.description}</td>
            <td><span class="status ${project.status}">${project.status === 'ongoing' ? 'En curso' : 'Planificado'}</span></td>
            <td>${project.responsible}</td>
            <td>${new Date(project.startDate).toLocaleDateString()} - ${new Date (project.endDate).toLocaleDateString()}</td>
            <td>
                <button onclick="editProject(this)">Editar</button>
                <button onclick="deleteProject(this)">Eliminar</button>
            </td>
        `;
        projectsBody.appendChild(row);
    });
}

function getProjects() {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : [];
}

/**
 * @param id
 * @returns Project, puede ser nulo si no se encuentra un valor con el id proporcionado
 */
function getProjectById(id) {
    const projects = getProjects();
    return projects.find(project => project.id === id);
}

function filterProjects() {
    const filter = document.getElementById("search").value.toUpperCase();
    const table = document.getElementById("projectsTable");
    const tr = table.getElementsByTagName("tr");
    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[0]; // Filtrar solo por título
        if (td) {
            const txtValue = td.textContent || td.innerText;
            tr[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
}
// El codigo de crear nuevo proyecto
document.getElementById('createProjectForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtener valores del formulario
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const budget = document.getElementById('budget').value;
    const status = document.getElementById('status').value;

    // Crear un objeto de proyecto
    const project = {
        title: projectName,
        description: projectDescription,
        status: status,
        responsible: 'Colaboradores: ' + document.getElementById('collaborators').value, // Puedes ajustar esto según cómo manejes los colaboradores
        startDate: startDate,
        endDate: endDate,
        budget: budget,
        createdAt: new Date().toISOString() // Fecha de creación
    };

    // Guardar el proyecto en localStorage
    saveProject(project);

    // Redirigir a la lista de proyectos
    window.location.href = 'lista-de-proyectos.html'; // Cambia a la URL de tu lista de proyectos
});

function saveProject(project) {
    const projects = getProjects();
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
}

function getProjects() {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : [];
}
// Codigo de la pagina de perfil de configuracion

document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página

    // Obtener los valores de los campos del formulario
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;
    const profilePic = document.getElementById('profilePic').files[0]; // Captura el archivo
    const socialLinks = document.getElementById('socialLinks').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const interests = document.getElementById('interests').value;
    const privacySettings = document.getElementById('privacySettings').value;

    // Crear un objeto con los datos del perfil
    const userProfile = {
        fullName,
        email,
        bio,
        socialLinks,
        phone,
        address,
        interests,
        privacySettings
    };

    // Guardar los datos en localStorage
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    // Si se desea guardar la imagen, se puede hacer mediante FileReader (opcional)
    if (profilePic) {
        const reader = new FileReader();
        reader.onloadend = function() {
            localStorage.setItem('profilePic', reader.result); // Guarda la imagen como base64
        };
        reader.readAsDataURL(profilePic); // Convierte la imagen a base64
    }

    // Mostrar mensaje de éxito
    document.getElementById('successMessage').style.display = 'block';
    
    // Opcional: Limpiar el formulario después de guardar
    this.reset();
});

// Codigo de foto de perfil
document.getElementById('profilePic').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('profilePicPreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result; // Establecer la fuente de la imagen
            preview.style.display = 'block'; // Mostrar la imagen
        }
        reader.readAsDataURL(file); // Leer el archivo como URL de datos
    } else {
        preview.src = ''; // Limpiar la vista previa si no hay archivo
        preview.style.display = 'none'; // Ocultar la imagen
    }
});

// Inicializar la aplicación
renderTasks();
updateProgressPercentage();
renderTimelineEvents();
renderActivityLog();
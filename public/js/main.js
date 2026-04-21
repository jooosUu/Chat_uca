document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');

    if (!chatInput || !sendBtn || !chatMessages) return;

    // Función para agregar un mensaje al chat
    const addMessage = (text, type = 'sent') => {
        if (!text.trim()) return;

        const msgWrapper = document.createElement('div');
        msgWrapper.classList.add('msg-wrapper', type);

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const avatarName = type === 'sent' ? 'Juan' : 'UCA';
        const avatarBg = type === 'sent' ? 'eee' : '0D1B3E';
        const avatarColor = type === 'sent' ? '333' : 'fff';

        msgWrapper.innerHTML = `
            <img src="https://ui-avatars.com/api/?name=${avatarName}&background=${avatarBg}&color=${avatarColor}" class="msg-avatar" alt="Avatar">
            <div>
                <div class="msg-bubble">
                    ${text}
                </div>
                <span class="msg-time">${timeStr}</span>
            </div>
        `;

        chatMessages.appendChild(msgWrapper);
        
        // Scroll al fondo
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Limpiar input si es enviado por el usuario
        if (type === 'sent') {
            chatInput.value = '';
        }
    };

    // Evento Click en Enviar
    sendBtn.addEventListener('click', () => {
        addMessage(chatInput.value, 'sent');
    });

    // Evento Enter en Input
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addMessage(chatInput.value, 'sent');
        }
    });

    // Asegurar que el scroll inicie al fondo
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

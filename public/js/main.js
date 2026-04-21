document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');

    if (!chatInput || !sendBtn || !chatMessages) return;

    // Función para agregar un mensaje al chat (PDF Style)
    const addMessage = (text, type = 'sent') => {
        if (!text.trim()) return;

        const msgRow = document.createElement('div');
        msgRow.classList.add('msg-row', type);

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (type === 'received') {
            msgRow.innerHTML = `
                <div class="bubble">
                    ${text}
                </div>
                <div class="msg-meta">
                    <div class="avatar-small">UCA</div>
                    <span class="time">${timeStr}</span>
                </div>
            `;
        } else {
            msgRow.innerHTML = `
                <div class="bubble">
                    ${text}
                </div>
                <div class="msg-meta">
                    <div class="avatar-small circular"></div>
                    <span class="time">${timeStr}</span>
                </div>
            `;
        }

        chatMessages.appendChild(msgRow);
        
        // Scroll al fondo
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Limpiar input
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

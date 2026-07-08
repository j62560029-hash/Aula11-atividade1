const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Histórico da conversa iniciando com as instruções do Francisco (System Prompt)
let messages = [
    { role: "system", content: SYSTEM_PROMPT }
];

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Adiciona mensagem do usuário na tela e no histórico
    appendMessage(text, 'user');
    messages.push({ role: "user", content: text });
    userInput.value = '';

    try {
        const response = await fetch(CONFIG.BASE_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${CONFIG.API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": window.location.href, // Requisito do OpenRouter
                "X-Title": "Francisco Auto Consultor"
            },
            body: JSON.stringify({
                model: "google/gemini-2.5-flash", // Ou o modelo de sua preferência
                messages: messages
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        // Adiciona resposta do Francisco na tela e no histórico
        appendMessage(reply, 'assistant');
        messages.push({ role: "assistant", content: reply });

    } catch (error) {
        console.error("Erro ao falar com o Francisco:", error);
        appendMessage("Desculpe, tive um pequeno problema técnico. Pode repetir?", 'assistant');
    }
}

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
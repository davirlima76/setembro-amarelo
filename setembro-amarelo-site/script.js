// ==========================================
// ENTRE NÓS — Setembro Amarelo
// Mood Tracker + mensagens + menu
// ==========================================

"use strict";

// ---------- Menu mobile ----------
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// ---------- Mood Tracker ----------
const moodOptions = document.querySelectorAll(".mood-option");
const moodResult = document.getElementById("moodResult");
const moodHistory = document.getElementById("moodHistory");
const clearHistory = document.getElementById("clearHistory");

const MOOD_STORAGE_KEY = "entre-nos-mood-history";

const moodMessages = {
    "muito-bem": {
        title: "Que bom que você está se sentindo bem! 😄",
        text: "Aproveite esse momento e, se puder, compartilhe um pouco dessa energia positiva com alguém."
    },
    "bem": {
        title: "É bom saber que você está bem. 🙂",
        text: "Continue cuidando de você e respeitando seus limites. Pequenos cuidados também fazem diferença."
    },
    "neutro": {
        title: "Tudo bem estar em um dia neutro. 😐",
        text: "Você não precisa estar feliz o tempo todo. Observe seu momento sem se cobrar tanto."
    },
    "triste": {
        title: "Sentir tristeza também faz parte. 😔",
        text: "Não precisa guardar tudo sozinho. Se puder, converse com alguém de confiança sobre como você está."
    },
    "sobrecarregado": {
        title: "Você não precisa carregar tudo sozinho. 😣",
        text: "Tente diminuir o ritmo e fazer uma coisa de cada vez. Procurar alguém de confiança pode ajudar."
    }
};

function getHistory() {
    try {
        return JSON.parse(localStorage.getItem(MOOD_STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveHistory(history) {
    localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(history));
}

function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function renderHistory() {
    const history = getHistory();

    if (history.length === 0) {
        moodHistory.innerHTML = '<p class="empty-history">Você ainda não registrou um sentimento.</p>';
        return;
    }

    moodHistory.innerHTML = history.map((item) => `
        <div class="history-entry">
            <span class="history-emoji">${item.emoji}</span>
            <div>
                <span class="history-label">${item.label}</span>
                <span class="history-date">${formatDate(item.date)}</span>
            </div>
        </div>
    `).join("");
}

function showMoodResult(mood) {
    const message = moodMessages[mood];

    moodResult.innerHTML = `
        <span class="result-icon">${document.querySelector(`[data-mood="${mood}"]`).dataset.emoji}</span>
        <div>
            <strong>${message.title}</strong>
            <p>${message.text}</p>
        </div>
    `;

    moodResult.animate(
        [
            { opacity: 0, transform: "translateY(8px)" },
            { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 300, easing: "ease-out" }
    );
}

function registerMood(option) {
    const mood = option.dataset.mood;
    const emoji = option.dataset.emoji;
    const label = option.dataset.label;

    moodOptions.forEach((item) => item.classList.remove("selected"));
    option.classList.add("selected");

    showMoodResult(mood);

    const history = getHistory();

    history.unshift({
        mood,
        emoji,
        label,
        date: new Date().toISOString()
    });

    // Mantém somente os 7 registros mais recentes.
    saveHistory(history.slice(0, 7));
    renderHistory();
}

moodOptions.forEach((option) => {
    option.addEventListener("click", () => registerMood(option));
});

clearHistory.addEventListener("click", () => {
    localStorage.removeItem(MOOD_STORAGE_KEY);

    moodOptions.forEach((item) => item.classList.remove("selected"));

    moodResult.innerHTML = `
        <span class="result-icon">♡</span>
        <div>
            <strong>Seu sentimento importa.</strong>
            <p>Escolha uma opção acima para receber uma mensagem de apoio.</p>
        </div>
    `;

    renderHistory();
});

renderHistory();

// ---------- Mensagens de apoio ----------
const messages = [
    "Você merece cuidado, descanso e espaço para ser ouvido.",
    "Não existe vergonha em pedir ajuda. Você não precisa enfrentar tudo sozinho.",
    "Um dia difícil não define toda a sua história.",
    "Se hoje você só conseguir dar um pequeno passo, ele já conta.",
    "Falar sobre o que sentimos pode tornar o peso um pouco mais leve.",
    "Cuide de você com a mesma gentileza que oferece às pessoas que ama.",
    "Você não precisa ter todas as respostas agora. Procure apoio e vá um momento de cada vez."
];

const messageText = document.getElementById("messageText");
const newMessage = document.getElementById("newMessage");
let lastMessage = -1;

newMessage.addEventListener("click", () => {
    let nextMessage;

    do {
        nextMessage = Math.floor(Math.random() * messages.length);
    } while (nextMessage === lastMessage && messages.length > 1);

    lastMessage = nextMessage;

    messageText.animate(
        [
            { opacity: 0, transform: "translateY(8px)" },
            { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 350, easing: "ease-out" }
    );

    messageText.textContent = messages[nextMessage];
});

// ---------- Registro de clique no CVV ----------
document.querySelectorAll('a[href="tel:188"]').forEach((link) => {
    link.addEventListener("click", () => {
        console.log("Usuário selecionou o contato do CVV (188).");
    });
});

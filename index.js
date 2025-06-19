// === DOM Elements ===
const input = document.querySelector('.prompt-input');
const sendBtn = document.getElementById('send-prompt-btn');
const deleteBtn = document.getElementById('delete-chats-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const form = document.querySelector('.prompt-form');
const container = document.querySelector('.container');
const chatsContainer = document.querySelector('.chats-container');
const suggestions = document.querySelectorAll('.suggestions-item');

// === Load previous messages ===
window.addEventListener('DOMContentLoaded', () => {
  const history = localStorage.getItem('gemini-chat-history');
  if (history) {
    chatsContainer.innerHTML = history;
  }
});

// === Input Event: Toggle Send Button ===
input.addEventListener('input', () => {
  sendBtn.style.display = input.value.trim() ? 'inline-flex' : 'none';
});

// === Suggestion Click: Autofill Input ===
suggestions.forEach(item => {
  item.addEventListener('click', () => {
    const text = item.querySelector('.text').innerText;
    input.value = text;
    input.dispatchEvent(new Event('input'));
    input.focus();
  });
});

// === Submit Form ===
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userInput = input.value.trim();
  if (!userInput) return;
  appendMessage('user', userInput);
  input.value = '';
  input.dispatchEvent(new Event('input'));

  // Simulate bot typing
  setTimeout(() => {
    appendBotTyping();
    setTimeout(() => {
      replaceTypingWithMessage("This is a dummy Gemini response.");
    }, 1000);
  }, 500);
});

// === Append User or Bot Message ===
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}-message`;

  if (sender === 'bot') {
    msg.innerHTML = `<img src="gemini-logo.svg" class="avatar"><p class="message-text">${text}</p>`;
  } else {
    msg.innerHTML = `<p class="message-text">${text}</p>`;
  }

  chatsContainer.appendChild(msg);
  chatsContainer.scrollTop = chatsContainer.scrollHeight;
  saveChatHistory();
}

// === Typing Animation ===
function appendBotTyping() {
  const typing = document.createElement('div');
  typing.className = 'message bot-message typing';
  typing.innerHTML = `<img src="gemini-logo.svg" class="avatar"><p class="message-text">Typing...</p>`;
  chatsContainer.appendChild(typing);
  chatsContainer.scrollTop = chatsContainer.scrollHeight;
}

function replaceTypingWithMessage(text) {
  const typing = document.querySelector('.typing');
  if (typing) typing.remove();
  appendMessage('bot', text);
}

// === Save to LocalStorage ===
function saveChatHistory() {
  localStorage.setItem('gemini-chat-history', chatsContainer.innerHTML);
}

// === Delete All Chats ===
deleteBtn.addEventListener('click', () => {
  chatsContainer.innerHTML = '';
  localStorage.removeItem('gemini-chat-history');
});

// === Toggle Theme ===
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  themeToggleBtn.textContent = document.body.classList.contains('light-mode')
    ? 'dark_mode'
    : 'light_mode';
});

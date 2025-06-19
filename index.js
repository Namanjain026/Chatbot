// === DOM Elements ===
const input = document.querySelector('.prompt-input');
const sendBtn = document.getElementById('send-prompt-btn');
const deleteBtn = document.getElementById('delete-chats-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const form = document.querySelector('.prompt-form');
const container = document.querySelector('.container');
const chatsContainer = document.querySelector('.chats-container');
const suggestions = document.querySelectorAll('.suggestions-item');
const header = document.querySelector('.app-header');
const suggestionsBox = document.querySelector('.suggestions');
const fileInput = document.getElementById('file-input');
const fileBtn = document.getElementById('add-file-btn');
const fileNameDisplay = document.getElementById('selected-file-name');

// === Load previous messages ===
window.addEventListener('DOMContentLoaded', () => {
  const history = localStorage.getItem('gemini-chat-history');
  if (history) {
    chatsContainer.innerHTML = history;
    toggleChatUI(true);
  } else {
    toggleChatUI(false);
  }
  sendBtn.style.display = input.value.trim() ? 'inline-flex' : 'none';
  scrollToBottom(true);
});

// === Toggle Visibility ===
function toggleChatUI(showChat) {
  if (showChat) {
    header.style.display = 'none';
    suggestionsBox.style.display = 'none';
    chatsContainer.style.display = 'flex';
  } else {
    header.style.display = 'block';
    suggestionsBox.style.display = 'flex';
    chatsContainer.style.display = 'none';
  }
}

// === Scroll to Bottom ===
function scrollToBottom(force = false) {
  requestAnimationFrame(() => {
    chatsContainer.scrollTop = chatsContainer.scrollHeight;
    if (force) {
      setTimeout(() => {
        chatsContainer.scrollTop = chatsContainer.scrollHeight;
      }, 100);
    }
  });
}

// === Input Event: Toggle Send Button ===
input.addEventListener('input', () => {
  sendBtn.style.display = input.value.trim() ? 'inline-flex' : 'none';
});

// === File Upload ===
fileBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    fileNameDisplay.textContent = `Attached: ${file.name}`;
  } else {
    fileNameDisplay.textContent = '';
  }
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
  toggleChatUI(true);
  appendMessage('user', userInput);
  input.value = '';
  fileInput.value = '';
  fileNameDisplay.textContent = '';
  input.dispatchEvent(new Event('input'));

  appendBotTyping(() => {
    replaceTypingWithMessage("This is a dummy Gemini response.");
  });
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}-message`;

  if (sender === 'bot') {
    msg.innerHTML = `<img src="gemini-logo.svg" class="avatar"><p class="message-text">${text}</p>`;
  } else {
    msg.innerHTML = `<p class="message-text">${text}</p>`;
  }

  chatsContainer.appendChild(msg);
  saveChatHistory();
  scrollToBottom(true);
}

function appendBotTyping(callback) {
  const typing = document.createElement('div');
  typing.className = 'message bot-message typing';
  typing.innerHTML = `
  <img src="gemini-logo.svg" class="avatar spinning">
  <p class="message-text"><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></p>
`;

  chatsContainer.appendChild(typing);
  scrollToBottom(true);

  // Animate dots (optional enhancement)
  const dots = typing.querySelectorAll('.typing-dots span');
  let count = 0;
  const interval = setInterval(() => {
    dots.forEach((dot, i) => {
      dot.style.opacity = i === count % 3 ? '1' : '0.2';
    });
    count++;
  }, 300);

  setTimeout(() => {
    clearInterval(interval);
    callback();
  }, 1500);
}

function replaceTypingWithMessage(text) {
  const typing = document.querySelector('.typing');
  if (typing) typing.remove();
  appendMessage('bot', text);
}

function saveChatHistory() {
  localStorage.setItem('gemini-chat-history', chatsContainer.innerHTML);
}

deleteBtn.addEventListener('click', () => {
  chatsContainer.innerHTML = '';
  localStorage.removeItem('gemini-chat-history');
  toggleChatUI(false);
  fileInput.value = '';
  fileNameDisplay.textContent = '';
});

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  themeToggleBtn.textContent = document.body.classList.contains('light-mode')
    ? 'dark_mode'
    : 'light_mode';
});

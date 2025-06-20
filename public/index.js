// // === DOM Elements ===
// const input = document.querySelector('.prompt-input');
// const sendBtn = document.getElementById('send-prompt-btn');
// const deleteBtn = document.getElementById('delete-chats-btn');
// const themeToggleBtn = document.getElementById('theme-toggle-btn');
// const form = document.querySelector('.prompt-form');
// const container = document.querySelector('.container');
// const chatsContainer = document.querySelector('.chats-container');
// const suggestions = document.querySelectorAll('.suggestions-item');
// const header = document.querySelector('.app-header');
// const suggestionsBox = document.querySelector('.suggestions');
// const fileInput = document.getElementById('file-input');
// const fileBtn = document.getElementById('add-file-btn');
// const fileNameDisplay = document.getElementById('selected-file-name');

// // === Load previous messages ===
// window.addEventListener('DOMContentLoaded', () => {
//   const history = localStorage.getItem('gemini-chat-history');
//   if (history) {
//     chatsContainer.innerHTML = history;
//     toggleChatUI(true);
//   } else {
//     toggleChatUI(false);
//   }
//   sendBtn.style.display = input.value.trim() ? 'inline-flex' : 'none';
//   scrollToBottom(true);
// });

// function toggleChatUI(showChat) {
//   if (showChat) {
//     header.style.display = 'none';
//     suggestionsBox.style.display = 'none';
//     chatsContainer.style.display = 'flex';
//   } else {
//     header.style.display = 'block';
//     suggestionsBox.style.display = 'flex';
//     chatsContainer.style.display = 'none';
//   }
// }

// function scrollToBottom(force = false) {
//   requestAnimationFrame(() => {
//     chatsContainer.scrollTop = chatsContainer.scrollHeight;
//     if (force) {
//       setTimeout(() => {
//         chatsContainer.scrollTop = chatsContainer.scrollHeight;
//       }, 100);
//     }
//   });
// }

// input.addEventListener('input', () => {
//   sendBtn.style.display = input.value.trim() ? 'inline-flex' : 'none';
// });

// fileBtn.addEventListener('click', () => {
//   fileInput.click();
// });

// fileInput.addEventListener('change', () => {
//   const file = fileInput.files[0];
//   if (file) {
//     fileNameDisplay.textContent = `Attached: ${file.name}`;
//   } else {
//     fileNameDisplay.textContent = '';
//   }
// });

// suggestions.forEach(item => {
//   item.addEventListener('click', () => {
//     const text = item.querySelector('.text').innerText;
//     input.value = text;
//     input.dispatchEvent(new Event('input'));
//     input.focus();
//   });
// });

// form.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const userInput = input.value.trim();
//   if (!userInput) return;
//   toggleChatUI(true);
//   appendMessage('user', userInput);
//   input.value = '';
//   fileInput.value = '';
//   fileNameDisplay.textContent = '';
//   input.dispatchEvent(new Event('input'));

//   appendBotTyping();

//   try {
//     const response = await fetch('http://localhost:5000/openrouter', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ prompt: userInput })
//     });

//     const data = await response.json();
//     replaceTypingWithMessageAnimated(data.reply || 'No reply received');
//   } catch (error) {
//     replaceTypingWithMessage('Error connecting to OpenRouter API');
//   }
// });

// function appendMessage(sender, text) {
//   const msg = document.createElement('div');
//   msg.className = `message ${sender}-message`;

//   if (sender === 'bot') {
//     msg.innerHTML = `<img src="gemini-logo.svg" class="avatar"><p class="message-text">${text}</p>`;
//   } else {
//     msg.innerHTML = `<p class="message-text">${text}</p>`;
//   }

//   chatsContainer.appendChild(msg);
//   saveChatHistory();
//   scrollToBottom(true);
// }

// function appendBotTyping() {
//   const typing = document.createElement('div');
//   typing.className = 'message bot-message typing';
//   typing.innerHTML = `
//     <img src="gemini-logo.svg" class="avatar typing-logo">
//     <p class="message-text"><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></p>
//   `;
//   chatsContainer.appendChild(typing);
//   scrollToBottom(true);

//   const dots = typing.querySelectorAll('.typing-dots span');
//   let count = 0;
//   const interval = setInterval(() => {
//     dots.forEach((dot, i) => {
//       dot.style.opacity = i === count % 3 ? '1' : '0.2';
//     });
//     const logo = typing.querySelector('.typing-logo');
//     logo.style.transform = `rotate(${count * 30}deg)`;
//     count++;
//   }, 300);
//   typing.setAttribute('data-interval', interval);
// }

// function replaceTypingWithMessageAnimated(text) {
//   const typing = document.querySelector('.typing');
//   if (typing) {
//     clearInterval(Number(typing.getAttribute('data-interval')));
//     typing.remove();
//   }

//   const msg = document.createElement('div');
//   msg.className = 'message bot-message';
//   msg.innerHTML = `<img src="gemini-logo.svg" class="avatar"><p class="message-text"></p>`;
//   chatsContainer.appendChild(msg);

//   const textEl = msg.querySelector('.message-text');
//   let i = 0;
//   const interval = setInterval(() => {
//     if (i < text.length) {
//       textEl.textContent += text.charAt(i);
//       i++;
//       scrollToBottom();
//     } else {
//       clearInterval(interval);
//       saveChatHistory();
//     }
//   }, 20);
// }

// function replaceTypingWithMessage(text) {
//   const typing = document.querySelector('.typing');
//   if (typing) {
//     clearInterval(Number(typing.getAttribute('data-interval')));
//     typing.remove();
//   }
//   appendMessage('bot', text);
// }

// function saveChatHistory() {
//   localStorage.setItem('gemini-chat-history', chatsContainer.innerHTML);
// }

// deleteBtn.addEventListener('click', () => {
//   chatsContainer.innerHTML = '';
//   localStorage.removeItem('gemini-chat-history');
//   toggleChatUI(false);
//   fileInput.value = '';
//   fileNameDisplay.textContent = '';
// });

// themeToggleBtn.addEventListener('click', () => {
//   document.body.classList.toggle('light-mode');
//   themeToggleBtn.textContent = document.body.classList.contains('light-mode')
//     ? 'dark_mode'
//     : 'light_mode';
// });

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

input.addEventListener('input', () => {
  sendBtn.style.display = input.value.trim() ? 'inline-flex' : 'none';
});

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

suggestions.forEach(item => {
  item.addEventListener('click', () => {
    const text = item.querySelector('.text').innerText;
    input.value = text;
    input.dispatchEvent(new Event('input'));
    input.focus();
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userInput = input.value.trim();
  if (!userInput) return;
  toggleChatUI(true);
  appendMessage('user', userInput);
  input.value = '';
  fileInput.value = '';
  fileNameDisplay.textContent = '';
  input.dispatchEvent(new Event('input'));

  appendBotTyping();

  try {
    const response = await fetch('http://localhost:5000/openrouter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: userInput })
    });

    const data = await response.json();
    replaceTypingWithMessageAnimated(data.reply || 'No reply received');
  } catch (error) {
    replaceTypingWithMessage('Error connecting to OpenRouter API');
  }
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

function appendBotTyping() {
  const typing = document.createElement('div');
  typing.className = 'message bot-message typing';
  typing.innerHTML = `
    <img src="gemini-logo.svg" class="avatar typing-logo">
    <p class="message-text"><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></p>
  `;
  chatsContainer.appendChild(typing);
  scrollToBottom(true);

  const dots = typing.querySelectorAll('.typing-dots span');
  let count = 0;
  const interval = setInterval(() => {
    dots.forEach((dot, i) => {
      dot.style.opacity = i === count % 3 ? '1' : '0.2';
    });
    const logo = typing.querySelector('.typing-logo');
    logo.style.transform = `rotate(${count * 30}deg)`;
    count++;
  }, 300);
  typing.setAttribute('data-interval', interval);
}

function replaceTypingWithMessageAnimated(text) {
  const typing = document.querySelector('.typing');
  if (typing) {
    clearInterval(Number(typing.getAttribute('data-interval')));
    typing.remove();
  }

  const msg = document.createElement('div');
  msg.className = 'message bot-message';
  msg.innerHTML = `<img src="gemini-logo.svg" class="avatar"><p class="message-text"></p>`;
  chatsContainer.appendChild(msg);

  const textEl = msg.querySelector('.message-text');
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      textEl.textContent += text.charAt(i);
      i++;
      scrollToBottom();
    } else {
      clearInterval(interval);
      saveChatHistory();
    }
  }, 20);
}

function replaceTypingWithMessage(text) {
  const typing = document.querySelector('.typing');
  if (typing) {
    clearInterval(Number(typing.getAttribute('data-interval')));
    typing.remove();
  }
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

const menuToggleBtn = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.chat-sidebar');

menuToggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  document.body.classList.toggle('sidebar-open');
});
document.getElementById('new-chat-btn').addEventListener('click', () => {
  // Clear previous chats and file
  document.querySelector('.chats-container').innerHTML = '';
  localStorage.removeItem('gemini-chat-history');

  // Show headers and suggestions
  document.querySelector('.app-header').style.display = 'block';
  document.querySelector('.suggestions').style.display = 'flex';
  document.querySelector('.chats-container').style.display = 'none';

  // Reset input and file
  document.querySelector('.prompt-input').value = '';
  document.getElementById('selected-file-name').textContent = '';
});
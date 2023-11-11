const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');
const remoteVideoPlaceholder = document.getElementById('remote-video-placeholder');
const chatMessages = document.getElementById('chat-messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const clearChatButton = document.getElementById('clear-chat-button');

let conversation = []; // Empty conversation array to store user messages

// Set up video streaming
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    localVideo.srcObject = stream;
    // Use the stream for video conferencing
    // You can send the stream to a server for remote users to access
  })
  .catch(error => {
    console.error('Error accessing media devices:', error);
  });

// Display initial conversation messages
displayConversation();

// Handle sending chat messages
messageForm.addEventListener('submit', event => {
  event.preventDefault();
  const userMessage = messageInput.value.trim();
  if (userMessage !== '') {
    sendMessage('User1', userMessage);
    messageInput.value = '';

    // Generate automatic response from the virtual assistant
    setTimeout(() => {
      const assistantMessage = generateAssistantResponse(userMessage);
      sendMessage('Virtual Assistant', assistantMessage);
    }, 500);
  }
});

// Clear chat messages
clearChatButton.addEventListener('click', () => {
  clearChat();
});

function displayConversation() {
  conversation.forEach(({ sender, message, time }) => {
    displayMessage(sender, message, time);
  });
}

function sendMessage(sender, message) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  displayMessage(sender, message, time);
  conversation.push({ sender, message, time }); // Add user message to the conversation array
}

function displayMessage(sender, message, time) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `
    <span class="message-sender">${sender}</span>
    <span class="message-time">${time}</span>
    <p class="message-text">${message}</p>
  `;
  messageElement.classList.add('message');
  if (sender === 'User1') {
    messageElement.classList.add('local');
  } else {
    messageElement.classList.add('remote');
  }
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Animate the new message
  setTimeout(() => {
    messageElement.classList.add('reveal');
  }, 100);
}

function showRemoteVideo() {
  remoteVideo.style.display = 'block';
  remoteVideoPlaceholder.style.display = 'none';
}

function showWaitingMessage() {
  remoteVideo.style.display = 'none';
  remoteVideoPlaceholder.style.display = 'flex';
}

// Simulate remote user joining after 3 seconds
setTimeout(() => {
  showWaitingMessage();
}, 3000);

function clearChat() {
  conversation = []; // Clear the conversation array
  chatMessages.innerHTML = ''; // Clear chat messages on the screen
}

function generateAssistantResponse(userMessage) {
  let response;

  if (userMessage.toLowerCase().includes('hi')) {
    response = `Hello user!`;
  } else if (userMessage.toLowerCase().includes('how are you')) {
    response = `I'm good. Thanks for asking! How about you?`;
  } else if (userMessage.toLowerCase().includes('whats your name')) {
    response = `my name is swaroop`;
  }
   else {
    response = `I'm sorry, I didn't understand that. How can I assist you today?`;
  }

  return response;
}

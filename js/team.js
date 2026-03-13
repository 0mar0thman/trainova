  document.getElementById('messageInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && this.value.trim() !== '') {
      const chatDiv = document.getElementById('chatMessages');
      const newMsg = document.createElement('div');
      newMsg.className = 'd-flex gap-2 flex-row-reverse';
      newMsg.innerHTML = `
        <div class="avatar-sm flex-shrink-0">OM</div>
        <div class="text-end" style="max-width: 70%;">
          <div class="d-flex align-items-baseline justify-content-end gap-2 mb-1">
            <span class="small text-secondary-emphasis">just now</span>
            <span class="fw-semibold small">You</span>
          </div>
          <div class="chat-bubble-own">${this.value}</div>
        </div>
      `;
      chatDiv.appendChild(newMsg);
      this.value = '';
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  });
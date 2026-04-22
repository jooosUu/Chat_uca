function goToPage(pageId) {
    var allPages = document.querySelectorAll('.page');
    for (var i = 0; i < allPages.length; i++) {
        allPages[i].classList.remove('active');
    }
    var target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
    }
    window.scrollTo(0, 0);

    // Update active state in sidebars
    var navItems = document.querySelectorAll('.sidebar-nav-item');
    for (var j = 0; j < navItems.length; j++) {
        navItems[j].classList.remove('active');
        if (navItems[j].getAttribute('data-page') === pageId) {
            navItems[j].classList.add('active');
        }
    }
}

function enterAsStudent() {
    goToPage('page-student-home');
}

function enterAsMonitor() {
    goToPage('page-monitor-home');
}

function openStudentChat(chatName) {
    var title = document.getElementById('studentChatTitle');
    if (title) title.textContent = chatName;
    goToPage('page-student-chat');
}

function openMonitorChat(studentName) {
    var title = document.getElementById('monitorChatTitle');
    if (title) title.textContent = studentName;
    goToPage('page-monitor-chat');
}

/* Student Chat */
function sendStudentMessage() {
    var inputEl = document.getElementById('studentMsgInput');
    var msgText = inputEl.value.trim();
    if (!msgText) return;

    var msgsContainer = document.getElementById('studentChatMessages');
    var nowDate = new Date();
    var hr = nowDate.getHours();
    var mn = nowDate.getMinutes().toString().padStart(2, '0');
    var period = hr >= 12 ? 'PM' : 'AM';
    var displayHr = hr % 12 || 12;
    var timeLabel = displayHr + ':' + mn + ' ' + period;

    var bubbleHtml = '<div class="chat-msg outgoing-msg student-msg">' +
        '<div class="chat-msg-avatar user-avatar"><img src="https://image.qwenlm.ai/public_source/86c0ed85-d19e-4e1b-a8f5-72cdb594ef24/18c71744a-8a6b-4666-9933-adb749520eb0.png" alt="User"></div>' +
        '<div><div class="chat-msg-bubble">' + escapeText(msgText) + '</div>' +
        '<div class="chat-msg-time">' + timeLabel + '</div></div></div>';

    msgsContainer.insertAdjacentHTML('beforeend', bubbleHtml);
    inputEl.value = '';
    msgsContainer.scrollTop = msgsContainer.scrollHeight;

    var filePrevBar = document.getElementById('studentFilePreview');
    if (filePrevBar && filePrevBar.classList.contains('show')) {
        removeStudentFile();
    }
}

function handleStudentKeypress(evt) {
    if (evt.key === 'Enter') {
        sendStudentMessage();
    }
}

function handleStudentFileSelect(evt) {
    var selectedFiles = evt.target.files;
    if (selectedFiles.length > 0) {
        var selectedFile = selectedFiles[0];
        var previewBar = document.getElementById('studentFilePreview');
        var nameEl = document.getElementById('studentFileName');
        var sizeEl = document.getElementById('studentFileSize');
        if (nameEl) nameEl.textContent = selectedFile.name;
        var sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1);
        if (sizeEl) sizeEl.textContent = sizeMB + ' MB';
        if (previewBar) previewBar.classList.add('show');
        showToast('Archivo "' + selectedFile.name + '" adjuntado');
    }
    evt.target.value = '';
}

function removeStudentFile() {
    var previewBar = document.getElementById('studentFilePreview');
    if (previewBar) previewBar.classList.remove('show');
    var input = document.getElementById('studentFileInput');
    if (input) input.value = '';
}

/* Monitor Chat */
function sendMonitorMessage() {
    var inputEl = document.getElementById('monitorMsgInput');
    var msgText = inputEl.value.trim();
    if (!msgText) return;

    var msgsContainer = document.getElementById('monitorChatMessages');
    var nowDate = new Date();
    var hr = nowDate.getHours();
    var mn = nowDate.getMinutes().toString().padStart(2, '0');
    var period = hr >= 12 ? 'PM' : 'AM';
    var displayHr = hr % 12 || 12;
    var timeLabel = displayHr + ':' + mn + ' ' + period;

    var bubbleHtml = '<div class="chat-msg outgoing-msg monitor-msg">' +
        '<div class="chat-msg-avatar bot-avatar"><div style="width:32px;height:32px;background:#0a1628;border-radius:4px;display:flex;align-items:center;justify-content:center;color:white;font-size:8px;font-weight:bold;">MONITOR</div></div>' +
        '<div><div class="chat-msg-bubble">' + escapeText(msgText) + '</div>' +
        '<div class="chat-msg-time">' + timeLabel + '</div></div></div>';

    msgsContainer.insertAdjacentHTML('beforeend', bubbleHtml);
    inputEl.value = '';
    msgsContainer.scrollTop = msgsContainer.scrollHeight;

    var filePrevBar = document.getElementById('monitorFilePreview');
    if (filePrevBar && filePrevBar.classList.contains('show')) {
        removeMonitorFile();
    }
}

function handleMonitorKeypress(evt) {
    if (evt.key === 'Enter') {
        sendMonitorMessage();
    }
}

function handleMonitorFileSelect(evt) {
    var selectedFiles = evt.target.files;
    if (selectedFiles.length > 0) {
        var selectedFile = selectedFiles[0];
        var previewBar = document.getElementById('monitorFilePreview');
        var nameEl = document.getElementById('monitorFileName');
        var sizeEl = document.getElementById('monitorFileSize');
        if (nameEl) nameEl.textContent = selectedFile.name;
        var sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1);
        if (sizeEl) sizeEl.textContent = sizeMB + ' MB';
        if (previewBar) previewBar.classList.add('show');
        showToast('Archivo "' + selectedFile.name + '" adjuntado');
    }
    evt.target.value = '';
}

function removeMonitorFile() {
    var previewBar = document.getElementById('monitorFilePreview');
    if (previewBar) previewBar.classList.remove('show');
    var input = document.getElementById('monitorFileInput');
    if (input) input.value = '';
}

function escapeText(text) {
    var divEl = document.createElement('div');
    divEl.appendChild(document.createTextNode(text));
    return divEl.innerHTML;
}

function showToast(message, isSuccess) {
    var toastEl = document.getElementById('toastNotification');
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.className = 'toast-notification show';
    if (isSuccess) {
        toastEl.classList.add('success');
    }
    setTimeout(function() {
        toastEl.classList.remove('show');
        toastEl.classList.remove('success');
    }, 3000);
}

// Ensure the profile page is active on load
window.onload = function() {
    console.log("UCA Academic Sanctuary Loaded");
};

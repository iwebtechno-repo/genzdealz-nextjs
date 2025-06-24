// Initialize the chatgpt bot
class SpecialChatbots extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
  <div id="chatbot-container" data-bs-backdrop="static" style="display: none">
    <div id="chatbot-interface" class="pb-3 shadow-lg">
      <div id="chatbot-header" class="position-relative shadow-sm">
        <img src="./icons/GENZGPT.png" alt="" class="" style="width: 60px;">
        <div class="ms-3 me-auto">
          <h3 class="fw-bold text-third mb-0">GenZGPT</h3>
          <h5 class="mb-0" style="color: #3ABF38;">● Online</h5>
        </div>
        <i class="fa fa-xmark-circle fs-2 close-chat-button rounded-circle shadow mb-auto text-third" ></i>
      </div>
        <div id="chat-container" class="chatbot-chat position-relative overflow-x-hidden" style="overflow-y: scroll; overflow-x: hidden;">
          <div id="chat-output">
            
            
            <span id="loading-icon" class="loading" style="display: none;"></span>
          </div>
          <div id="tog" class="tog">
            <div class="col-12 text-center">
              <img src="https://genzdealz.ai/images/GENZGPT.png" width="400px" alt="">
            </div>
          
            <div id="button-row-container" class="position-absolute bottom-0 w-100 pe-5"></div>
          </div>
        </div>
      <div id="chatbot-footer">
        <div id="chatbot-input-container">
          <input type="text" id="user-input" class="shadow" placeholder="Type your query..." />
          
        </div>
        <div id="chatbot-new-message-send-button">
          <i class="fa-regular fa-paper-plane" id="send-icon" onclick="sendMessage()"></i>
          
        </div>
      </div>
    </div>
  </div>

  <div id="chatbot-open-container" class="d-flex align-items-center justify-content-center shadow">
    <img src="./icons/GENZGPT.png" id="open-chat-button" width="25px" height="25px" alt="">
    <i class="fa fa-close fs-3" id="close-chat-button" style="display: none"></i>
  </div>

  <div id="chatgpt-bot-container" data-bs-backdrop="static" style="display: none">
    <div id="chatgpt-bot-interface" class="pb-3 shadow-lg">
      <div id="chatgpt-bot-header" class="flex-column shadow-sm pt-3">
        <div class="d-flex justify-content-between align-items-center w-100">
          <h5 class="mx-auto text-third mb-0 fw-bold">Ask Anything!</h5>
          <i class="close-chatgpt-button fa fa-xmark-circle fs-2 rounded-circle shadow mb-auto text-third"></i>
        </div>
        <div class="d-flex justify-content-around align-items-center w-100"> 
          <div class="d-flex align-items-center active" id="tab-chatgpt" onclick="switchTab('chatgpt')">
            <img src="./images/icon/gpt41.png" alt="" style="width: 45px;">
            <h5 class="m-0">ChatGPT 4.1</h5>
          </div>
          <div class="d-flex align-items-center" id="tab-deepseek" onclick="switchTab('deepseek')">
            <img src="./images/icon/deepseek.png" alt="" style="width: 45px;filter: none;">
            <h5 class="m-0">DeepSeek</h5>
          </div>
        </div>
      </div>
      <div id="chatgpt-container" class="chatgpt-bot-chat">
        <div id="chatgpt-output">


          <span id="chatgpt-loading-icon" class="loading" style="display: none;"></span>
        </div>

      </div>
      <div id="chatgpt-bot-footer" class="position-relative">
        <div id="file-upload-container" class="position-relative">
          <div id="preview-container" class="position-absolute start-0 bottom-100 mb-3 ms-2 bg-light rounded-4"
            style="display: none;">
          </div>
          <label class="shadow me-3 rounded-circle text-center d-flex justify-content-center align-items-center"
            style="height: 40px; width: 40px;" id="paperclip-icon" for="file-input"><i
              class="fa-solid fa-paperclip"></i></label>
          <input type="file" id="file-input" onchange="selectedFile = this.files[0]; handleFileInput(selectedFile);" style="display: none;" accept=".txt,.pdf,.doc,.docx,.png,.jpg,.gif">
        </div>
        <div id="chatgpt-bot-input-container">
          <input type="text" id="chatgpt-user-input" class="shadow" placeholder="Type your query..." />
        </div>
        <div id="mic-container">
          <div id="mic-animation" class="rounded-5 shadow py-2 px-3">
            <button id="cancelRecording"
              class="position-absolute bg-danger text-white rounded-circle p-0 border-0 py-0">x</button>
            <div id="barsVoice">
              <div class="bar-voice"></div>
              <div class="bar-voice"></div>
              <div class="bar-voice"></div>
              <div class="bar-voice"></div>
              <div class="bar-voice"></div>
              <div class="bar-voice"></div>
            </div>
          </div>
          <span class="shadow me-3 rounded-circle text-center d-flex justify-content-center align-items-center"
            style="height: 40px; width: 40px;" id="mic-button"><i class="fa-solid fa-microphone"></i></span>
        </div>

        <div id="chatgpt-bot-new-message-send-button">
          <i class="fa-regular fa-paper-plane" id="chatgpt-send-icon" onclick="sendChatgptMessage()"></i>

        </div>
      </div>
      <div id="deepseek-container" class="deepseek-bot-chat">
        <div id="deepseek-output">


          <span id="deepseek-loading-icon" class="loading" style="display: none;"></span>
        </div>

      </div>
      <div id="deepseek-bot-footer" class="position-relative">
        <div id="deepseek-file-upload-container" class="position-relative">
          <div id="deepseek-preview-container" class="position-absolute start-0 bottom-100 mb-3 ms-2 bg-light rounded-4"
            style="display: none;">
          </div>
          <label class="shadow me-3 rounded-circle text-center d-flex justify-content-center align-items-center"
            style="height: 40px; width: 40px;" id="deepseek-paperclip-icon" for="deepseek-file-input"><i
              class="fa-solid fa-paperclip"></i></label>
              <input type="file" id="deepseek-file-input" onchange="handleDeepseekFileInput(this.files[0])" style="display: none;" accept=".txt,.pdf,.doc,.docx,.png,.jpg,.gif">

        </div>
        <div id="deepseek-bot-input-container">
          <input type="text" id="deepseek-user-input" class="shadow" placeholder="Ask DeepSeek..." />
        </div>
        <div id="mic-container" class="d-none">
          <div id="mic-animation" class="rounded-5 shadow py-2 px-3">
            <button id="cancelRecording"
              class="position-absolute bg-danger text-white rounded-circle p-0 border-0 py-0">x</button>
            <div id="barsVoice">
              <div class="bar-voice"></div>
              <div class="bar-voice"></div>
              <div class="bar-voice"></div>
              <div class="bar-voice"></div>
              <div class="bar-voice"></div>
              <div class="bar-voice"></div>
            </div>
          </div>
          <span class="shadow me-3 rounded-circle text-center d-flex justify-content-center align-items-center"
            style="height: 40px; width: 40px;" id="mic-button"><i class="fa-solid fa-microphone"></i></span>
          <!-- <span class="shadow me-2 rounded-circle text-center d-flex justify-content-center align-items-center" style="height: 40px; width: 40px;" id="stop-button"><i class="fa-regular fa-circle-stop"></i></s> -->
        </div>

        <div id="deepseek-bot-new-message-send-button">
          <i class="fa-regular fa-paper-plane" id="deepseek-send-icon" onclick="sendDeepseekMessage()"></i>

        </div>
      </div>
    </div>
  </div>

  <div id="chatgpt-bot-open-container" class="d-flex align-items-center justify-content-center shadow">
    <img src="./images/icon/deep_gpt_3d.png" id="open-chatgpt-button" width="25px" height="25px" alt="">
    <i class="fa fa-close fs-3" id="close-chatgpt-button" style="display: none"></i>
  </div>
        `;
    }
}
customElements.define('special-chatbots', SpecialChatbots);






const userDataString1 = localStorage.getItem('userDataF') || localStorage.getItem('userDataA');
if (!userDataString1) {
    console.error("User data not available in local storage");
    // Optionally, handle the absence of user data and inform the user
}

let userData1 = null;
try {
    userData1 = JSON.parse(userDataString1);
} catch (error) {
    console.error("Failed to parse user data:", error);
}

const mobileNumber1 = userData1?.number || userData1?.mobile_no || userData1?.phoneNumber;
const name1 = userData1?.name?.trim();

// Function to extract the first and last words from a string
function getFirstAndLastWords(fullName1 = '') {
    const words1 = fullName1.split(/\s+/);
    const firstWord1 = words1[0] || 'DefaultFirst';
    const lastWord1 = words1[words1.length - 1] || 'DefaultLast';
    return { firstWord1, lastWord1 };
}

// Use the chosen userData for first_name and last_name
const { firstWord1, lastWord1 } = name1 ? getFirstAndLastWords(name1) : { firstWord1: ' ', lastWord1: ' ' };

// console.log(firstWord)
const safeName = firstWord1 || 'there'; // Default to 'there' if name is undefined or empty
// chatgpt code 
const chatgpt = document.getElementById("chatgpt-bot-chat");
let sessionId;
$("#chatgpt-bot-open-container").click(function () {
    // Set ChatGPT bot on top
    $("#chatgpt-bot-container").css("z-index", "999"); // Higher than chatbot-container
    $("#chatbot-container").css("z-index", "998"); // Lower the z-index of the chatbot
    $("#open-chatgpt-button").toggle(200);
    $("#close-chatgpt-button").toggle(200);
    $("#chatgpt-bot-container").fadeToggle(200);
    document.getElementById("chatgpt-user-input").value = "";
    document.getElementById("deepseek-user-input").value = "";
    setTimeout(() => {
        if ($("#chatgpt-bot-container").css("display") !== "none") {
            sessionId = getOrCreateSessionId();
        } else {
            localStorage.removeItem("session_id");
            $("#chatgpt-output").html("");
            $("#deepseek-output").html("");
        }
    }, 250); // Wait for fadeToggle to complete
});
$(".close-chatgpt-button").click(function () {
    $("#open-chatgpt-button").toggle(200);
    $("#close-chatgpt-button").toggle(200);
    $("#chatgpt-bot-container").fadeToggle(200);
    localStorage.removeItem("session_id");
    $("#chatgpt-output").html("");
    $("#deepseek-output").html("");
});
function closeChatgptPopup() {
    setTimeout(() => {
        document.getElementById("chatgpt-bot-container").style.display = "none";
        localStorage.removeItem("session_id");
        $("#chatgpt-output").html("");
        $("#deepseek-output").html("");
    }, 200); // 0.3s, which matches the transition duration
}
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        $("#open-chatgpt-button").show(200);
        $("#close-chatgpt-button").hide(200);
        $(".filters").hide(200);
        closeChatgptPopup();
        document.getElementById("user-input").value = "";
        localStorage.removeItem("session_id");
        $("#chatgpt-output").html("");
        $("#deepseek-output").html("");
    }
});

function getOrCreateSessionId() {
    let sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
        sessionId = crypto.randomUUID(); // Or generateSimpleSessionId()
        localStorage.setItem("session_id", sessionId);
    }
    return sessionId;
}


// sendChatgptMessage(file, audioFile, message, sessionId);


function parseBasicMarkdown(text) {
    // 1. Convert headings
    text = text
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // 2. Convert horizontal rules
    text = text.replace(/^---$/gim, '<hr>');

    // 3. Convert bold and italic
    text = text
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // 4. Table support (basic)
    const tableRegex = /((?:\|.*\|\n)+)/g;
    text = text.replace(tableRegex, (tableBlock) => {
        const rows = tableBlock.trim().split('\n');
        const table = rows.map((row, i) => {
            const cols = row.split('|').slice(1, -1).map(col => col.trim());
            const tag = i === 0 ? 'th' : 'td';
            return `<tr>${cols.map(c => `<${tag}>${c}</${tag}>`).join('')}</tr>`;
        }).join('');
        return `<table>${table}</table>`;
    });

    // 5. List support
    const lines = text.split('\n');
    let formatted = '';
    let inUl = false;
    let inOl = false;

    for (let line of lines) {
        if (/^\s*-\s+/.test(line)) {
            if (!inUl) {
                formatted += '<ul>';
                inUl = true;
            }
            formatted += `<li>${line.replace(/^\s*-\s+/, '')}</li>`;
        } else if (/^\s*\d+\.\s+/.test(line)) {
            if (!inOl) {
                formatted += '<ol>';
                inOl = true;
            }
            formatted += `<li>${line.replace(/^\s*\d+\.\s+/, '')}</li>`;
        } else {
            if (inUl) {
                formatted += '</ul>';
                inUl = false;
            }
            if (inOl) {
                formatted += '</ol>';
                inOl = false;
            }
            if (line.trim() !== '') {
                formatted += `<p>${line}</p>`;
            }
        }
    }

    if (inUl) formatted += '</ul>';
    if (inOl) formatted += '</ol>';

    return formatted.trim();
}


function showChatgptTypingIndicator() {
    const sendBtn = document.getElementById("chatgpt-bot-new-message-send-button");
    // Disable the element
    // sendBtn.classList.add("disabled");
    sendBtn.style.pointerEvents = "none"; // Prevent clicks
    sendBtn.style.opacity = "0.5"; // Optional: Make it look visually disabled
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("bot-message", "typing-indicator");
    typingIndicator.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
    document.getElementById("chatgpt-output").appendChild(typingIndicator);
}

function hideChatgptTypingIndicator() {
    const typingIndicator = document.querySelector(".typing-indicator");
    if (typingIndicator) {
        typingIndicator.remove();
        const sendBtn = document.getElementById("chatgpt-bot-new-message-send-button");
        sendBtn.style.pointerEvents = "auto"; // Allow clicks
        sendBtn.style.opacity = "1"; // Restore visual appearance
    }
}

let isChatgptSendingMessage = false;



function scrollChatToBottom() {
    const chat = document.getElementById("chatgpt-container");
    chat.scrollTop = chat.scrollHeight;
}

// document.getElementById("chatgpt-user-input").addEventListener("keyup", function (event) {
//     if (event.key === "Enter") {
//         sendChatgptMessage();
//     }
// });

let audioRecorder = null;
let audioChunks = [];
let audioBlob = null;
let isRecordingPaused = false;
let isRecordingCanceled = false; // Flag to track if recording is canceled
let isFileCancelled = false; // Track whether the file is cancelled
let mediaStream = null; // Store the media stream globally
let selectedFile = null;
const previewContainer = document.getElementById("preview-container");
const fileInfo = document.getElementById("file-info");
const fileInput = document.getElementById("file-input");
// const cancelFile = document.getElementById("cancelFile");

// Update button UI based on state
function updateMicButtonUI() {
    const micButton = document.getElementById("mic-button");
    const micAnimation = document.getElementById("mic-animation");
    const micAnimationChild = document.getElementsByClassName("bar-voice");
    // console.log(micAnimationChild)  

    if (audioRecorder) {
        if (isRecordingPaused) {
            micButton.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
            // Pause animation without hiding it
            for (const child of micAnimationChild) {
                child.style.animationPlayState = "paused"; // Pause animation
                child.style.opacity = "0.5"; // Optional: Dim to indicate paused state
            }
        } else {
            micButton.innerHTML = `<i class="fa-solid fa-stop"></i>`;
            micAnimation.style.display = "block"; // Show animation
            for (const child of micAnimationChild) {
                child.style.animationPlayState = "running"; // Pause animation
                child.style.opacity = "1"; // Optional: Dim to indicate paused state
            }
        }
    } else {
        micButton.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
        micAnimation.style.display = "none"; // Hide animation when stopped
    }
}

function stopMediaStream() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
    }
    // Revoke any stream usage permissions
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            stream.getTracks().forEach((track) => track.stop());
        })
        .catch(() => {
            console.log("Permissions revoked or already stopped.");
        });
}
// Add cancel button functionality
document.getElementById("cancelRecording").addEventListener("click", () => {
    if (audioRecorder) {
        isRecordingCanceled = true; // Set the flag to indicate cancellation
        if (audioRecorder.state !== "inactive") {
            audioRecorder.stop();
        }
        audioChunks = [];
        stopMediaStream();
        audioBlob = null; // Clear the audio blob
        appendChatgptMessage("Recording canceled.", true);
        updateMicButtonUI();
        audioRecorder = null; // Reset recorder
    }

    // Reset UI and state
    const micButton = document.getElementById("mic-button");
    const micAnimation = document.getElementById("mic-animation");

    micButton.innerHTML = `<i class="fa-solid fa-microphone"></i>`; // Reset to default mic icon
    micAnimation.style.display = "none"; // Hide animation

    // Clear recording data
    audioChunks = [];
    audioBlob = null;

    // console.log("Recording canceled and cleared.");
});
// Start recording
async function startRecording() {
    if (!audioRecorder) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // Proceed with recording
            audioRecorder = new MediaRecorder(stream);
            audioChunks = [];
            isRecordingCanceled = false; // Reset cancel flag

            audioRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            audioRecorder.onstop = async () => {
                if (isRecordingCanceled) {
                    // console.log("Recording was canceled. No data will be processed.");
                    return; // Skip processing if recording was canceled
                }

                if (audioChunks.length > 0) {
                    // Process the recording if not canceled
                    const webmBlob = new Blob(audioChunks, { type: "audio/webm" });
                    audioBlob = await convertWebmToWav(webmBlob); // Convert to WAV
                    const audioFile = new File([audioBlob], "audio.wav", { type: "audio/wav" });
                    const audioURL = URL.createObjectURL(audioBlob);
                    appendChatgptMessage("Audio Recording", true, audioURL); // Append audio play button in chat
                    audioChunks = [];
                    const userInput = document.getElementById("chatgpt-user-input");
                    const message = userInput.value.trim();
                    sendChatgptMessage(selectedFile, audioFile, message, sessionId);

                }
                stopMediaStream();
            };

            audioRecorder.start();
            updateMicButtonUI();
            // console.log("Recording started.");
        } catch (error) {
            if (error.name === 'NotAllowedError') {
                console.error('User denied microphone access.');
            } else if (error.name === 'NotFoundError') {
                console.error('No microphone device found.');
            } else {
                console.error('Error accessing microphone:', error);
            }
        }

    }
}

// Pause or resume recording
function togglePauseRecording() {
    if (audioRecorder) {
        if (isRecordingPaused) {
            audioRecorder.resume();
            isRecordingPaused = false;
        } else {
            audioRecorder.pause();
            isRecordingPaused = true;
        }
        updateMicButtonUI();
    }
}

// Stop recording
function stopRecording() {
    if (audioRecorder && audioRecorder.state !== "inactive") {
        audioRecorder.stop();
        audioRecorder = null;
        isRecordingPaused = false;
        updateMicButtonUI();
    }
}

// Convert WebM to WAV format
async function convertWebmToWav(webmBlob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            const arrayBuffer = reader.result;
            const audioContext = new AudioContext();
            audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                const wavData = encodeWav(audioBuffer); // Encode to WAV
                const wavBlob = new Blob([wavData], { type: 'audio/wav' });
                resolve(wavBlob);
            }, reject);
        };
        reader.readAsArrayBuffer(webmBlob);
    });
}

// WAV encoding (simplified)
function encodeWav(audioBuffer) {
    const sampleRate = audioBuffer.sampleRate;
    const numChannels = audioBuffer.numberOfChannels;
    const bufferLength = audioBuffer.length;
    const wavData = new ArrayBuffer(44 + bufferLength * numChannels * 2);
    const view = new DataView(wavData);

    // RIFF header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + bufferLength * numChannels * 2, true);
    writeString(view, 8, 'WAVE');

    // fmt chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true); // byte rate
    view.setUint16(32, numChannels * 2, true); // block align
    view.setUint16(34, 16, true); // bit depth

    // data chunk
    writeString(view, 36, 'data');
    view.setUint32(40, bufferLength * numChannels * 2, true);

    // Write audio data
    const audioData = audioBuffer.getChannelData(0);
    let offset = 44;
    for (let i = 0; i < bufferLength; i++) {
        const sample = Math.max(-1, Math.min(1, audioData[i]));
        view.setInt16(offset, sample * 0x7fff, true);
        offset += 2;
    }

    return wavData;
}

// Write string to buffer
function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}



// Handle file input
function handleFileInput(file, fileInputId = "file-input") {
    const previewContainer = document.getElementById("preview-container");
    const fileInput = document.getElementById(fileInputId);

    if (file && fileInput) {
        isFileCancelled = false; // Reset the cancel flag
        previewContainer.style.display = "block"; // Show preview container

        const fileName = file.name;
        const fileExtension = fileName.split('.').pop().toUpperCase();

        // Clear previous previews
        previewContainer.innerHTML = "";

        // Create cancel button
        const cancelFile = createCancelButton(() => {
            cancelFilePreview(); // Call the cancel logic
            isFileCancelled = true; // Set the flag to true
        });

        // Preview image or handle non-image files  
        if (file.type.startsWith("image/")) {
            const imgPreview = document.createElement("img");
            imgPreview.src = URL.createObjectURL(file);
            imgPreview.alt = fileName;
            imgPreview.style.objectFit = "cover";
            imgPreview.style.height = "65px";
            imgPreview.style.width = "65px";
            imgPreview.onload = () => URL.revokeObjectURL(imgPreview.src); // Revoke object URL
            previewContainer.appendChild(imgPreview);
        } else {
            const fileIcon = document.createElement("span");
            fileIcon.classList.add("d-flex", "align-items-center", "bg-light", "px-2", "py-2", "rounded-3");
            fileIcon.innerHTML = `<i class="fa-solid fa-file fs-1 text-third me-2"></i>
                                    <span class="fw-bold small text-third">${fileExtension}</span>`;
            previewContainer.appendChild(fileIcon);
        }

        previewContainer.appendChild(cancelFile);

        // Add event listener to send button
        const sendButton = document.getElementById("chatgpt-send-icon");

        addSendButtonListener(sendButton, () => {
            const userInput = document.getElementById("chatgpt-user-input");
            const message = userInput.value.trim();

            if (isFileCancelled || (!message && !selectedFile)) return;

            let messageContent = "";

            if (selectedFile) {
                const fileName = selectedFile.name;
                const fileExtension = fileName.split('.').pop().toUpperCase();
                messageContent += selectedFile.type.startsWith("image/")
                    ? `${fileExtension} - ${fileName}`
                    : `<i class="fa-solid fa-file"></i> ${fileName}`;
            }

            if (message) {
                if (messageContent !== "") messageContent += "<br>"; // add line break if file name exists
                messageContent += message;
            }

            appendChatgptMessage(messageContent, true);
            sendChatgptMessage(selectedFile, null, message, sessionId);

            // Clean up
            userInput.value = "";
            selectedFile = null;
            previewContainer.style.display = "none";
            previewContainer.innerHTML = "";
            fileInput.value = "";
        });

    } else {
        previewContainer.style.display = "none"; // Hide preview container if no file is selected
    }
}
function cancelFilePreview() {
    const previewContainer = document.getElementById("preview-container");
    const fileInput = document.getElementById("file-input");

    // Reset UI
    previewContainer.style.display = "none"; // Hide the preview container
    previewContainer.innerHTML = ""; // Clear the preview content

    // Replace the file input to completely clear the file reference
    const newFileInput = fileInput.cloneNode(true); // Clone the existing input
    newFileInput.value = ""; // Ensure the value is cleared
    fileInput.replaceWith(newFileInput); // Replace the old input with the new one
    newFileInput.id = fileInput.id; // Preserve the ID for consistency

    selectedFile = null;
}

// Helper function to create a cancel button
function createCancelButton(onClick) {
    const cancelFile = document.createElement("button");
    cancelFile.classList.add("position-absolute", "bg-danger", "text-white", "rounded-circle", "p-0", "border-0");
    cancelFile.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    cancelFile.style.top = "-10px";
    cancelFile.style.right = "-13px";
    cancelFile.style.zIndex = "99";
    cancelFile.style.cursor = "pointer";
    cancelFile.style.height = "25px";
    cancelFile.style.width = "25px";
    cancelFile.addEventListener("click", onClick);
    return cancelFile;
}

// Helper function to add a listener to the send button
function addSendButtonListener(button, onClick) {
    button.replaceWith(button.cloneNode(true)); // Remove all existing listeners
    const newButton = document.getElementById(button.id); // Fetch new button reference
    newButton.addEventListener("click", onClick, { once: true });
}

function sendChatgptMessage(file = null, audioFile = null, message = "", sessionId) {
    if (isChatgptSendingMessage) return;
    if (isFileCancelled) return;

    const hasText = message.length > 0;
    const hasFile = !!file;
    const hasAudio = !!audioFile;

    if (!hasText && !hasFile && !hasAudio) return;

    isChatgptSendingMessage = true;
    showChatgptTypingIndicator();

    const formData = new FormData();
    formData.append("message", hasText ? message : "");
    formData.append("session_id", sessionId);
    if (hasFile) {
        formData.append("file", file, file.name);
    }

    if (hasAudio) {
        formData.append("audio_file", audioFile, "recorded_audio.wav");
    }

    fetch("https://flashweb.iweberp.com/api/analyze", {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            return response.json();
        })
        .then((data) => {
            const reply = data.ai_response || data.error || "No response";
            appendChatgptMessage(reply, false);
            scrollChatToBottom();
        })
        .catch((error) => {
            console.error("ChatGPT send error:", error);
            appendChatgptMessage("Something went wrong.", false);
        })
        .finally(() => {
            hideChatgptTypingIndicator();
            isChatgptSendingMessage = false;
        });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        stopRecording();
        const userInput = document.getElementById("chatgpt-user-input");
        const message = userInput.value.trim();

        if (!message && !selectedFile) return;

        let messageContent = "";

        if (selectedFile) {
            const fileName = selectedFile.name;
            const fileExtension = fileName.split('.').pop().toUpperCase();
            messageContent += selectedFile.type.startsWith("image/")
                ? `${fileExtension} - ${fileName}`
                : `<i class="fa-solid fa-file"></i> ${fileName}`;
        }

        if (message) {
            if (messageContent !== "") messageContent += "<br>"; // line break between file and text
            messageContent += message;
        }

        appendChatgptMessage(messageContent, true);
        sendChatgptMessage(selectedFile, null, message, sessionId);

        // Reset
        userInput.value = "";
        selectedFile = null;
        document.getElementById("preview-container").style.display = "none";
        document.getElementById("preview-container").innerHTML = "";
        document.getElementById("file-input").value = "";
    }
});


// Add stop button functionality
["chatgpt-send-icon", "chatgpt-bot-new-message-send-button"].forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
        stopRecording();

        const userInput = document.getElementById("chatgpt-user-input");
        const message = userInput.value.trim();
        const hasText = message.length > 0;
        const hasFile = !!selectedFile;

        if (!hasText && !hasFile) return;

        let messageContent = "";

        if (selectedFile) {
            const fileName = selectedFile.name;
            const fileExtension = fileName.split('.').pop().toUpperCase();
            messageContent += selectedFile.type.startsWith("image/")
                ? `${fileExtension} - ${fileName}`
                : `<i class="fa-solid fa-file"></i> ${fileName}`;
        }

        if (message) {
            if (messageContent !== "") messageContent += "<br>"; // line break
            messageContent += message;
        }

        appendChatgptMessage(messageContent, true);
        sendChatgptMessage(selectedFile, null, message, sessionId);

        // Reset
        userInput.value = "";
        selectedFile = null;
        document.getElementById("preview-container").style.display = "none";
        document.getElementById("preview-container").innerHTML = "";
        document.getElementById("file-input").value = "";

    });
});


// Update message appending to include the play button
function appendChatgptMessage(message, isUser = false, audioURL = null) {
    const chatOutput = document.getElementById("chatgpt-output");
    const messageElement = document.createElement("div");
    messageElement.classList.add(isUser ? "chatgpt-user-message" : "bot-message");
    const parsed = isUser ? message : parseBasicMarkdown(message);
    //   messageElement.innerHTML = parsed;
    if (audioURL) {
        const audioElement = document.createElement("audio");
        audioElement.controls = true;
        audioElement.src = audioURL;
        messageElement.appendChild(audioElement);
    } else {
        // Display text message
        const textElement = document.createElement("span");
        textElement.innerHTML = parsed
            .replace(/[*#]/g, "") // Sanitize input
            .replace(/\n/g, "<br>"); // Handle line breaks
        messageElement.appendChild(textElement);
    }

    chatOutput.scrollTop = chatOutput.scrollHeight; // Auto-scroll to the bottom
    chatOutput.appendChild(messageElement);
}

// Add event listeners for the mic button
document.getElementById("mic-button").addEventListener("click", () => {
    if (!audioRecorder) {
        startRecording();
    } else {
        togglePauseRecording();
    }
});



// deepseek code ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let isDeepseekSendingMessage = false;

function appendDeepseekMessage(message, isUser = false) {
    const output = document.getElementById("deepseek-output");
    const messageElement = document.createElement("div");
    messageElement.classList.add(isUser ? "deepseek-user-message" : "bot-message");

    const parsed = isUser ? message : parseBasicMarkdown(message);
    messageElement.innerHTML = parsed;

    output.appendChild(messageElement);
    output.scrollTop = output.scrollHeight;
}
function parseBasicMarkdown(text) {
    return text
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')                      // ### heading
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')                       // ## heading
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')                        // # heading
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')          // **bold**
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')                      // *italic*
        .replace(/^\- (.*$)/gim, '<li>$1</li>')                       // - list item
        .replace(/\n/g, '<br>')                                      // line breaks
        .replace(/<li>(.*?)<\/li>/gim, '<ul><li>$1</li></ul>')       // wrap list items in <ul>
        .replace(/<\/ul>\s*<ul>/gim, '')                             // merge adjacent <ul>
        .trim();
}

function showDeepseekTypingIndicator() {
    const sendBtn = document.getElementById("deepseek-bot-new-message-send-button");
    sendBtn.style.pointerEvents = "none";
    sendBtn.style.opacity = "0.5";

    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("bot-message", "typing-indicator");
    typingIndicator.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
    document.getElementById("deepseek-output").appendChild(typingIndicator);
}

function hideDeepseekTypingIndicator() {
    const typingIndicator = document.querySelector("#deepseek-output .typing-indicator");
    if (typingIndicator) typingIndicator.remove();

    const sendBtn = document.getElementById("deepseek-bot-new-message-send-button");
    sendBtn.style.pointerEvents = "auto";
    sendBtn.style.opacity = "1";
}

function sendDeepseekMessage(event) {
    event?.preventDefault();
    if (isDeepseekSendingMessage) return;

    const messageInput = document.getElementById("deepseek-user-input");
    const message = messageInput?.value.trim();
    const fileInput = document.getElementById("deepseek-file-input");
    const selectedFile = fileInput.files[0];
    // Exit if neither message nor a pending file (file is now handled separately)
    if (!message && !selectedFile) {
        return; // 🔄 Don't alert anymore — just do nothing
    }

    isDeepseekSendingMessage = true;

    messageInput.value = ""; // then clear input

    let messageContent = "";

    if (selectedFile) {
        const fileName = selectedFile.name;
        const fileExtension = fileName.split('.').pop().toUpperCase();

        messageContent += selectedFile.type.startsWith("image/")
            ? `${fileExtension} - ${fileName}`
            : `<i class="fa-solid fa-file"></i> ${fileName}`;

            document.getElementById("deepseek-preview-container").style.display = "none";
        document.getElementById("deepseek-preview-container").innerHTML = "";
        fileInput.value = "";
    }

    // Add a line break before the text if file exists
    if (message) {
        if (messageContent !== "") messageContent += "<br>";
        messageContent += message;
    }

    // ✅ Only append if there's something to show
    if (messageContent) {
        appendDeepseekMessage(messageContent, true);
    }

    showDeepseekTypingIndicator();

    const formdata = new FormData();
    formdata.append("message", message || "");

    if (selectedFile) {
        formdata.append("file", selectedFile, selectedFile.name);
        if (selectedFile.type.startsWith("audio/")) {
            formdata.append("audio_file", selectedFile, selectedFile.name);
        }
    }

    fetch("https://flashweb.iweberp.com/api/deepseek_chat_file", {
        method: "POST",
        body: formdata,
        redirect: "follow"
    })
        .then((res) => res.json())
        .then((result) => {
            appendDeepseekMessage(result.ai_response || "No response.");
        })
        .catch((error) => {
            console.error("❌ Error:", error);
            appendDeepseekMessage("Something went wrong.");
        })
        .finally(() => {
            hideDeepseekTypingIndicator();
            isDeepseekSendingMessage = false;
        });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const input = document.getElementById("deepseek-user-input");
        const fileInput = document.getElementById("deepseek-file-input");

        const hasText = input?.value.trim().length > 0;
        const hasFile = fileInput?.files.length > 0;

        if (hasText || hasFile) {
            sendDeepseekMessage(event);
        }
    }
});

function handleDeepseekFileInput(file) {
    const previewContainer = document.getElementById("deepseek-preview-container");
    const fileInput = document.getElementById("deepseek-file-input");

    if (file && fileInput) {
        let isFileCancelled = false; // Local flag

        previewContainer.style.display = "block";
        previewContainer.innerHTML = "";

        const fileName = file.name;
        const fileExtension = fileName.split('.').pop().toUpperCase();

        const cancelFile = createCancelButton(() => {
            previewContainer.style.display = "none";
            previewContainer.innerHTML = "";
            isFileCancelled = true;
            fileInput.value = "";
        });

        if (file.type.startsWith("image/")) {
            const imgPreview = document.createElement("img");
            imgPreview.src = URL.createObjectURL(file);
            imgPreview.alt = fileName;
            imgPreview.style.objectFit = "cover";
            imgPreview.style.height = "65px";
            imgPreview.style.width = "65px";
            imgPreview.onload = () => URL.revokeObjectURL(imgPreview.src);
            previewContainer.appendChild(imgPreview);
        } else {
            const fileIcon = document.createElement("span");
            fileIcon.classList.add("d-flex", "align-items-center", "bg-light", "px-2", "py-2", "rounded-3");
            fileIcon.innerHTML = `<i class="fa-solid fa-file fs-1 text-third me-2"></i><span class="fw-bold small text-third">${fileExtension}</span>`;
            // fileIcon.innerHTML = `<i class="fa-solid fa-file fs-1 me-2"></i> ${fileName}`;
            previewContainer.appendChild(fileIcon);
        }

        previewContainer.appendChild(cancelFile);



    } else {
        previewContainer.style.display = "none";
    }
}



// genzgpt code +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const chat = document.getElementById("chatbot-chat");
let elementToHide = document.getElementById("tog")
function welcomeText() {
    const welcomeHtml = `
        <div class="bot-message">
            <div class="text px-0">
                Hello ${safeName}, how can I assist you today?
            </div>
        </div>
    `;

    $('#chat-output').html(welcomeHtml);

    const textElement = document.querySelector('#chat-output .bot-message:last-child .text');
    const textContent = textElement.textContent.trim();

    // Measure pixel width using temp span
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.fontFamily = getComputedStyle(textElement).fontFamily;
    tempSpan.style.fontSize = getComputedStyle(textElement).fontSize;
    tempSpan.textContent = textContent;
    document.body.appendChild(tempSpan);

    const pixelWidth = tempSpan.getBoundingClientRect().width;
    tempSpan.textContent = '0';
    const chWidth = tempSpan.getBoundingClientRect().width || 8;
    document.body.removeChild(tempSpan);

    const adjustedCharCount = Math.round(pixelWidth / chWidth);
    const adjustedWidth = `${adjustedCharCount + 1}ch`;

    textElement.style.setProperty('--text-width', adjustedWidth);
    textElement.style.setProperty('--characters', adjustedCharCount);

    // Listen for animation end to remove border
    textElement.addEventListener('animationend', () => {
        textElement.style.borderRight = 'none';
    });

    elementToHide.style.display = 'block';
}


$(".chatbot-btn").click(function () {
    // Set chatbot on top
    $("#chatbot-container").css("z-index", "999"); // Higher than chatgpt-bot-container
    $("#chatgpt-bot-container").css("z-index", "998"); // Lower the z-index of the ChatGPT bot

    $("#open-chat-button").toggle(200);
    $("#close-chat-button").toggle(200);
    $("#chatbot-container").fadeToggle(200);

    welcomeText()
});
$("#chatbot-open-container").click(function () {
    // Set chatbot on top
    $("#chatbot-container").css("z-index", "999"); // Higher than chatgpt-bot-container
    $("#chatgpt-bot-container").css("z-index", "998"); // Lower the z-index of the ChatGPT bot

    $("#open-chat-button").toggle(200);
    $("#close-chat-button").toggle(200);
    $("#chatbot-container").fadeToggle(200);
    // sessionStorage.toggle = true;
    sessionStorage.clear();
    welcomeText();
    document.getElementById("user-input").value = ""; // Clear the input field
});
$(".close-chat-button").click(function () {
    $("#open-chat-button").toggle(200);
    $("#close-chat-button").toggle(200);
    $("#chatbot-container").fadeToggle(200);
    sessionStorage.clear();
});
const buttonLabelsOne = [
    // "Tell me about GenZDealZ.ai 🎧",
    'Shared Subscriptions <img src="https://cdn3.emoji.gg/emojis/6783-netflix.png" alt="icon" style="width:16px; height:16px; vertical-align:middle;">',
    "Mobile Recharge 📱",
    "Best Food Deals 🍱",
    "Discounts on OTT Platforms 🎥",
    "Best Beauty Deals ✨",
    "Hottest Shoe Deals 👟",
    "Deals on Health and Beauty Products? 🧘‍♀️"
];

const buttonLabelsTwo = [
    "Deals For Students 📚",
    "Best Pizza Deals 🍕",
    "Internships or Jobs 📈",
    "Student Loan Options 💸",
    "Book Deals or Learning Resources can you recommend? 📓"
];

const buttonLabelsThree = [
    "Madgaon Jobs 💼",
    "Best Travel Deals 🚄",
    "Best Fashion Deals 👗",
    "Deals on Gadgets and Accessories 🎮",
    "Hyperlocal Deals Available on this Platform? 🏪"
];

// Function to create buttons dynamically for each button container
function createButtons(containerId, labels) {
    const buttonContainer = document.getElementById(containerId);
    labels.forEach(label => {
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn", "shadow-sm", "rounded-pill", "me-2", "text-nowrap");
        button.style.color = "#505050";
        button.style.backgroundColor = "#EEEEEE";

        // Use innerHTML instead of textContent to allow image rendering
        button.innerHTML = label;

        // Add click event listener to handle button click
        button.addEventListener("click", () => {
            // Remove HTML tags for input and sendMessage
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = label;
            const plainText = tempDiv.textContent || tempDiv.innerText || "";

            document.getElementById("user-input").value = plainText; // Set input with plain text
            sendMessage(plainText); // Pass the plain text to sendMessage
            document.getElementById("user-input").value = ""; // Clear the input field
        });

        buttonContainer.appendChild(button);
    });
}


// Function to create a dynamic row with buttons
function createButtonRow(labels, index) {
    const rowContainer = document.createElement("div");
    rowContainer.classList.add("row-container", "d-flex");

    const leftButton = document.createElement("button");
    leftButton.classList.add("scroll-btn", "left-btn");
    leftButton.setAttribute("aria-label", `Scroll Left ${index}`);
    leftButton.innerHTML = `<i class="fa fa-chevron-left small"></i>`; // Left arrow

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("d-flex", "overflow-x-auto", "pb-1");
    buttonContainer.id = `button-container-${index}`; // Unique ID for each button container

    const rightButton = document.createElement("button");
    rightButton.classList.add("scroll-btn", "right-btn");
    rightButton.setAttribute("aria-label", `Scroll Right ${index}`);
    rightButton.innerHTML = `<i class="fa fa-chevron-right small"></i>`; // Right arrow

    // Add scroll functionality to buttons
    leftButton.addEventListener('click', () => {
        buttonContainer.scrollBy({ left: -150, behavior: 'smooth' });
    });

    rightButton.addEventListener('click', () => {
        buttonContainer.scrollBy({ left: 150, behavior: 'smooth' });
    });

    // Append all elements to the row container
    rowContainer.appendChild(leftButton);
    rowContainer.appendChild(buttonContainer);
    rowContainer.appendChild(rightButton);

    // Append row to the main button row container
    document.getElementById("button-row-container").appendChild(rowContainer);

    // Create buttons in the button container
    createButtons(`button-container-${index}`, labels);
}

// Call the function to create all button rows when the page loads
createButtonRow(buttonLabelsOne, 1);
createButtonRow(buttonLabelsTwo, 2);
createButtonRow(buttonLabelsThree, 3);


// elementToHide.style.display = 'block';
function closePopup() {
    setTimeout(() => {
        document.getElementById("chatbot-container").style.display = "none";
        sessionStorage.clear();
        document.getElementById("user-input").value = ""; // Clear the input field

    }, 200); // 0.3s, which matches the transition duration
}
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        $("#open-chat-button").show(200);
        $("#close-chat-button").hide(200);
        $(".filters").hide(200);
        document.getElementById("user-input").value = ""; // Clear the input field
        closePopup();
        sessionStorage.clear();
    }
});

function appendMessage(message, isUser = false, data = null) {
    const chatOutput = document.getElementById("chat-output");
    // console.log(data)
    if (Array.isArray(data)) {
        if (data.length === 0) {
            const hasColon = message?.includes(":");

            const messageElement = document.createElement("div");
            messageElement.classList.add("bot-message");

            if (hasColon) {
                messageElement.innerHTML = "Yo, sorry, no deals matchin' that!";
            } else {
                messageElement.innerHTML = parseBasicMarkdown(message || "Yo, sorry, no deals matchin' that!");
            }

            chatOutput.appendChild(messageElement);
            scrollChatgptToBottom();
            return;
        }

        const lines = message.split("\n");
        const introMessage = lines[0]; // Use the first line as the intro message
        const closingMessage = lines[lines.length - 1]; // Last line of the message

        // Create the container for the bot message
        const botMessageContainer = document.createElement("div");
        botMessageContainer.classList.add("bot-message");

        // Render the intro message
        if (introMessage) {
            const introElement = document.createElement("div");
            introElement.classList.add("col-12", "message", "pb-3");
            introElement.innerHTML = parseBasicMarkdown(introMessage);
            botMessageContainer.appendChild(introElement);
        }

        // Render the deals
        data.forEach((deal, index) => {

            function detectPlatform() {
                const ua = navigator.userAgent || navigator.vendor || window.opera;

                // Mobile
                if (/android/i.test(ua)) return "android";
                if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return "ios";

                // Desktop OS checks
                if (navigator.userAgent.includes("Mac OS X")) return "mac";
                if (navigator.userAgent.includes("Windows")) return "windows";
                if (navigator.userAgent.includes("Linux")) return "linux";

                return "desktop"; // Fallback
            }

            const platform = detectPlatform();

            const kombuchaLink =
                platform === "android" || platform === "windows" || platform === "linux"
                    ? "https://play.google.com/store/apps/details?id=iweb.student.marketplace"
                    : platform === "ios" || platform === "mac"
                        ? "https://apps.apple.com/in/app/genzdealz-ai/id6504975486"
                        : "https://play.google.com/store/apps/details?id=iweb.student.marketplace"; // general fallback
            const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

            // Update url if needed
            if (deal.url) {
                if (deal.url.includes("https://flashweb.iweberp.com/api/kj_store_products")) {
                    deal.url = deal.url.replace("https://flashweb.iweberp.com/api/kj_store_products", `${window.location.origin}/somaiya_detail`);
                } else if (deal.url.includes("https://flashweb.iweberp.com/api")) {
                    deal.url = deal.url.replace("https://flashweb.iweberp.com/api", window.location.origin);
                } else if (deal.url.includes("https://genzdealz.ai/sayf_store_detail")) {
                    deal.url = deal.url.replace("https://genzdealz.ai/sayf_store_detail", `${window.location.origin}/brands_store_detail`);
                } else if (deal.url.includes("https://www.securemyscholarship.com/referral?utm_source=genzdeals")) {
                    deal.url = deal.url.replace("https://www.securemyscholarship.com/referral?utm_source=genzdeals", `${window.location.origin}/secure_scholarship`);
                } else if (deal.url.includes("https://riseglobal.in")) {
                    deal.url = deal.url.replace("https://riseglobal.in", `${window.location.origin}/abroad_application`);
                }
                else if (deal.url.includes("https://www.flexmoney.in")) {
                    deal.url = deal.url.replace("https://www.flexmoney.in", `${window.location.origin}/flex_money`);
                }
                else if (deal.url.includes("https://wa.me/+919322655704?text=I%20would%20like%20to%20know%20more%20about%20the%20iPhone8.%20Please%20provide%20additional%20details.")) {
                    deal.url = deal.url.replace("https://wa.me/+919322655704?text=I%20would%20like%20to%20know%20more%20about%20the%20iPhone8.%20Please%20provide%20additional%20details.", `${window.location.origin}/iphone`);
                }
                else if (deal.url.includes("https://genzdealz.ai/home")) {
                    deal.url = deal.url.replace("https://genzdealz.ai/home", `${window.location.origin}/life_vitae`);
                }
                else if (deal.url.includes("https://sbooch.com")) {
                    deal.url = deal.url.replace("https://sbooch.com", kombuchaLink);
                }
                else if (uuidRegex.test(deal.url)) {
                    deal.url = `${window.location.origin}/recharge`;
                }
            } else if (deal.planPrice != null && deal.sharedPrice != null) {
                deal.url = `${window.location.origin}/shared_subs?dealName=${encodeURIComponent(deal.brandName)}`;
            } else if (deal.brandId != null) {
                deal.url = `${window.location.origin}/brands_store_detail?storeId=${deal.brandId}`;
            } else {
                deal.url = `${window.location.origin}/recharge`;
                deal.discountPercentage = (deal.discountPercentage / 1000).toFixed(2);
            }

            const dealSection = document.createElement("div");
            dealSection.classList.add("deal-section");
            dealSection.setAttribute("data-title", deal.brandName || "#");

            const dealContainer = document.createElement("div");
            dealContainer.classList.add("card", "mb-4", "align-items-center", "rounded-0", "pb-3");
            dealContainer.style.backgroundColor = "transparent";
            dealContainer.style.border = "transparent";
            dealContainer.style.borderBottom = "2px solid #CDCACA";
            // dealContainer.style.height = "129.938px";

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body", "p-0", "d-flex", "w-100", "h-100");


            const cardLink = document.createElement("div");
            cardLink.classList.add("h-100", "w-100", "d-flex", "align-items-center");
            cardLink.style.cursor = "pointer";
            cardLink.title = "Click to view the deal";

            const url = deal.url?.trim() || "#";
            cardLink.dataset.url = url; // Attach URL as data attribute
            cardLink.setAttribute("role", "link");
            cardLink.setAttribute("tabindex", "0");

            // Add deal image
            if (deal.image) {
                const imageElement = document.createElement("img");
                imageElement.src = deal.image;
                imageElement.alt = deal.brandName || "Deal Image";
                imageElement.classList.add("deal-image", "rounded-4");
                // imageElement.loading = "lazy";
                imageElement.style.objectFit = "contain";
                cardLink.appendChild(imageElement);
            }
            // Add deal title right side of the image
            const dealName = document.createElement("div");
            dealName.classList.add("px-3");

            // Add deal title below the image
            const dealTitle = document.createElement("a");
            dealTitle.href = deal.url || "#";
            dealTitle.target = "_self";
            dealTitle.style.color = "#1D2F47";
            dealTitle.title = "Click to view the deal";
            dealTitle.classList.add("fw-bold");
            dealTitle.textContent = `${index + 1}. ${deal.brandName || "Untitled Deal"}`;
            dealName.appendChild(dealTitle);

            // Add badge for discount if available
            const badge = document.createElement("p");
            badge.classList.add("mb-0");
            badge.style.color = "#6C7584";
            const discount = deal.maxDiscount || deal.discountPercentage;
            badge.textContent = discount ? `${discount}% Off` : "Click for deal";
            dealName.appendChild(badge);
            // Add gradient overlay
            // const gradientDiv = document.createElement("div");
            // gradientDiv.classList.add("grad", "dark_edge");
            // cardLink.appendChild(gradientDiv);
            cardLink.appendChild(dealName);

            // Add arrow right side of the name
            const arrowContainer = document.createElement("div");
            arrowContainer.classList.add("h-100", "d-flex", "align-items-center", "justify-content-center", "ms-auto", "me-3");

            const arrowIcon = document.createElement("i");
            arrowIcon.classList.add("fa-solid", "fa-chevron-right", "fs-6", "text-dark");
            arrowIcon.style.color = "#1D2F47";
            arrowIcon.style.marginLeft = "auto";
            arrowContainer.appendChild(arrowIcon);
            cardLink.appendChild(arrowContainer);

            cardBody.appendChild(cardLink);
            dealContainer.appendChild(cardBody);


            dealSection.appendChild(dealContainer);
            botMessageContainer.appendChild(dealSection);
            scrollChatgptToBottom()
            // console.log(dealTitle)
        });
        // Add the closing message only if it matches the specific content and doesn't already exist
        const closingMessageContent = "Enjoy these amazing offers! 😊✨";
        // Add the closing message

        if (closingMessage === closingMessageContent) {
            const closingElement = document.createElement("div");
            closingElement.classList.add("col-12", "message", "closing-message");
            closingElement.textContent = closingMessage;
            botMessageContainer.appendChild(closingElement);
        }
        chatOutput.appendChild(botMessageContainer);
    } else if (data && data.response) {
        // Clean the response by removing * and #
        const cleanedResponse = data.response;
        // Handle response text like an intro message
        const botMessageContainer = document.createElement("div");
        botMessageContainer.classList.add("bot-message");
        // Handle response text like an intro message
        const introElement = document.createElement("div");
        introElement.classList.add("col-12", "message");
        introElement.innerHTML = parseBasicMarkdown(cleanedResponse);
        // Append introElement to botMessageContainer
        botMessageContainer.appendChild(introElement);
        // Append the container to the chat output
        chatOutput.appendChild(botMessageContainer);
        scrollChatgptToBottom()
    } else if (message) {
        // Handle regular bot/user messages
        const messageElement = document.createElement("div");
        messageElement.classList.add(isUser ? "user-message" : "bot-message");
        messageElement.innerHTML = parseBasicMarkdown(message);
        chatOutput.appendChild(messageElement);
        scrollChatgptToBottom()
    }
    function parseBasicMarkdown(text) {
        if (!text) return "";
        return text
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')                      // ### heading
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')                       // ## heading
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')                        // # heading
            .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')          // **bold**
            .replace(/\*(.*?)\*/gim, '<em>$1</em>')                      // *italic*
            .replace(/^\- (.*$)/gim, '<li>$1</li>')                       // - list item
            .replace(/\n/g, '<br>')                                      // line breaks
            .replace(/<li>(.*?)<\/li>/gim, '<ul><li>$1</li></ul>')       // wrap list items in <ul>
            .replace(/<\/ul>\s*<ul>/gim, '')                             // merge adjacent <ul>
            .trim();
    }
    $(".deal-section").off("click").on("click", function () {
        let title = $(this).data("title");
        let userDataF = JSON.parse(localStorage.getItem("userDataF"));

        // Store chatbot state + page URL in sessionStorage before redirecting
        if ($("#chatbot-container").is(":visible")) {
            sessionStorage.setItem("chatbotOpen", "true");
            sessionStorage.setItem("chatbotLastResponse", $("#chat-output").html());
            sessionStorage.setItem("chatbotLastPage", window.location.href); // Store current page URL

            // Store visibility states of #tog, #open-chat-button, and #close-chat-button
            sessionStorage.setItem("togVisible", $("#tog").is(":visible"));
            sessionStorage.setItem("openChatButtonVisible", $("#open-chat-button").is(":visible"));
            sessionStorage.setItem("closeChatButtonVisible", $("#close-chat-button").is(":visible"));
        }
        // console.log(url, userDataF)
        gtag('event', 'chatbot_click_web', {
            'chatbot_click_web_category': 'Link Click',
            'chatbot_click_label': `Product Name:${title}, user Detail: ${userDataF.name} ${userDataF.email} ${userDataF.phoneNumber}`,
            'transport_type': 'beacon'
        });
    });
    chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the bottom
    adjustImageRatios(); // Adjust image ratios after rendering
}

// Helper function to adjust image ratios (16:9)
function adjustImageRatios() {
    const imgRatios = document.querySelectorAll(".img-ratio");

    imgRatios.forEach(imgRatio => {
        const imgRatioWidth = imgRatio.offsetWidth;  // Get the width of the element
        const height = (imgRatioWidth * 9) / 16;     // Calculate height for 16:9 ratio
        imgRatio.style.height = `${height}px`;       // Set the height dynamically
    });

    // Recalculate aspect ratio when the window resizes
    window.addEventListener("resize", () => {
        imgRatios.forEach(imgRatio => {
            const imgRatioWidth = imgRatio.offsetWidth;
            const height = (imgRatioWidth * 9) / 16;
            imgRatio.style.height = `${height}px`;
        });
    });
}
adjustImageRatios();
// Create a new MutationObserver
const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
            // Call adjustImageRatios when new nodes are added
            adjustImageRatios();
        }
    }
});

// Observe the chat output container for added nodes
const chatOutput = document.getElementById("chat-output");
observer.observe(chatOutput, {
    childList: true,  // Listen for the addition/removal of child elements
    subtree: true     // Observe changes within all descendant elements
});
// Helper functions to handle string and object details
function handleStringDetail(detail, cardLink) {
    let dealUrl = "";

    // Handling discount
    if (detail.includes("Deal Discount") || detail.includes("Discount")) {
        // console.log("discount string");
        let discount = detail
            .replace(/-?\s*\*\*(Deal )?Discount:\*\*\s*/, "")  // Handles optional dash and whitespace
            .trim();

        // console.log(discount);

        // Refactored discount condition
        if (['n/a', 'not specified', 'Not specifiedOff', 'Not specified', 'not specified.', '0%', "Information not available"].includes(discount.toLowerCase())) {
            discount = 'Click for deal';
        }

        const discountText = document.createElement("p");
        discountText.textContent = `${discount}`;
        discountText.classList.add("position-absolute", "badge", "text-bg-danger", "px-2");
        discountText.style.borderRadius = "0px 12px";
        discountText.style.top = "5px";
        discountText.style.right = "5px";
        cardLink.appendChild(discountText);
    }

    // Handling price
    if (detail.includes("Deal Price") || detail.includes("Price")) {
        // console.log("price string");
        const price = detail.replace(/- \*\*(Deal )?Price:\*\* /, "").trim();
        const priceText = document.createElement("p");
        priceText.textContent = `Price Range: ${price}`;
    }

    // Handling image
    if (detail.includes("Deal Image") || detail.includes("Image")) {
        // console.log("img string");
        const imageUrlMatch = detail.match(/!\((.*?)\)/);  // Extract the URL inside the parentheses
        if (imageUrlMatch) {
            const imageUrl = imageUrlMatch[1].trim();
            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            imageElement.alt = "Deal Image";
            imageElement.classList.add("deal-image", "h-100", "w-100", "rounded-4");
            // imageElement.loading = "lazy";
            imageElement.style.objectFit = "contain";
            cardLink.appendChild(imageElement);

            const divElem = document.createElement("div");
            divElem.classList.add("grad", "dark_edge");
            cardLink.appendChild(divElem);
        }
    }

    // Handling URL
    if (detail.includes("Deal URL") || detail.includes("URL")) {
        // console.log("url string");
        const urlMatch = detail.match(/\((.*?)\)/);  // Extract the URL inside the parentheses
        if (urlMatch) {
            dealUrl = urlMatch[1].trim();  // Clean up deal URL
        }
    }

    return dealUrl;
}


function handleObjectDetail(detail, cardLink) {
    let dealUrl = "";
    const discount = detail.Discount || detail["Deal Discount"];
    const price = detail.Price || detail["Deal Price"];
    const image = detail.Image || detail["Deal Image"];
    dealUrl = detail.URL || detail["Deal URL"];

    if (discount) {
        // console.log("discount obj")
        const discountText = document.createElement("p");
        discountText.textContent = `${discount}`;
        discountText.classList.add("position-absolute", "badge", "text-bg-danger", "px-2");
        discountText.style.borderRadius = "0px 12px";
        discountText.style.top = "5px";
        discountText.style.right = "5px";
        cardLink.appendChild(discountText);
    }

    if (price) {
        // console.log("price obj")
        const priceText = document.createElement("p");
        priceText.textContent = `Price Range: ${price}`;
        // cardLink.appendChild(priceText);
    }

    if (image) {
        // console.log("img obj")
        const imageUrl = image.replace(/!\(|\(|\)/g, "").trim();  // Clean up image URL
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.alt = "Deal Image";
        imageElement.classList.add("deal-image", "h-100", "w-100", "rounded-4");
        // imageElement.loading = "lazy";
        imageElement.style.objectFit = "contain";
        cardLink.appendChild(imageElement);
        const divElem = document.createElement("div");
        divElem.classList.add("grad", "dark_edge");
        cardLink.appendChild(divElem);
    }

    if (dealUrl) {
        // console.log("url obj")
        dealUrl = dealUrl.replace(/\(|\)/g, "").trim();  // Clean up deal URL
    }

    return dealUrl;
}



function showTypingIndicator() {

    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("bot-message", "typing-indicator");
    typingIndicator.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
    document.getElementById("chat-output").appendChild(typingIndicator);
    const sendBtn = document.getElementById("chatbot-new-message-send-button");
    sendBtn.style.pointerEvents = "none"; // Prevent clicks
    sendBtn.style.opacity = "0.5"; // Optional: Make it look visually disabled
}

function hideTypingIndicator() {
    const typingIndicator = document.querySelector(".typing-indicator");
    if (typingIndicator) {
        typingIndicator.remove();
    }
    const sendBtn = document.getElementById("chatbot-new-message-send-button");
    sendBtn.style.pointerEvents = "auto"; // Allow clicks
    sendBtn.style.opacity = "1"; // Restore visual appearance
}

let isSendingMessage = false;

function sendMessage(message = null) {
    if (isSendingMessage) return;
    isSendingMessage = true;
    elementToHide.style.display = 'none';
    const userInput = document.getElementById("user-input");
    const userMessage = message || userInput.value.trim(); // Use the message argument if available

    if (!userMessage) {
        isSendingMessage = false;
        return;
    }

    appendMessage(userMessage, true);  // Append user message
    showTypingIndicator();

    // userInput.disabled = true;  // Disable input during API call
    document.getElementById("user-input").value = ""; // Clear the input field
    // Your existing API call and message handling...
    const userId = localStorage.getItem('userId');
    const urlencoded = new URLSearchParams();
    urlencoded.append("message", userMessage);
    const apiUrl = `https://flashweb.iweberp.com/api/genzgpt_new`;
    // const apiUrl = `https://flashweb.iweberp.com/api/genz_gpt_voice?message=${encodeURIComponent(userMessage)}`;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'user_id': userId || ''  // Add user_id in headers, use default if not available
        },
        body: urlencoded,
        redirect: "follow"
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const botMessage = data.message; // Get the bot message if available
            const deals = data.deals; // Get deals if available
            const textResponse = data.response; // Get response text if available

            if (Array.isArray(deals) && deals.length > 0) {
                appendMessage(botMessage, false, deals);
            } else if (textResponse) {
                appendMessage(textResponse, false, []);
            } else {
                appendMessage("No deals available right now.", false);
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            appendMessage("Sorry, something went wrong. Please try again later.", false);
        })
        .finally(() => {
            isSendingMessage = false;
            // userInput.disabled = false;  // Re-enable input
            hideTypingIndicator();
        });
}




function scrollChatgptToBottom() {
    const chat = document.getElementById("chat-container");
    chat.scrollTop = chat.scrollHeight;
}



document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const input = document.getElementById("user-input");
        const hasText = input?.value.trim().length > 0;

        if (hasText) {
            sendMessage();
        }
    }
});


// Restore chatbot ONLY if user comes back to the same page
window.addEventListener("pageshow", function () {
    let lastPage = sessionStorage.getItem("chatbotLastPage");

    if (lastPage === window.location.href && sessionStorage.getItem("chatbotOpen") === "true") {
        $("#chatbot-container").fadeIn(200);
        $("#chat-output").html(sessionStorage.getItem("chatbotLastResponse"));

        // Restore visibility of #tog
        if (sessionStorage.getItem("togVisible") === "true") {
            $("#tog").show();
        } else {
            $("#tog").hide();
        }

        // Restore visibility of #open-chat-button
        if (sessionStorage.getItem("openChatButtonVisible") === "true") {
            $("#open-chat-button").show();
        } else {
            $("#open-chat-button").hide();
        }

        // Restore visibility of #close-chat-button
        if (sessionStorage.getItem("closeChatButtonVisible") === "true") {
            $("#close-chat-button").show();
        } else {
            $("#close-chat-button").hide();
        }
    } else {
        // $("#chatbot-container").hide(); // Ensure chatbot does NOT show on any other page
    }
});



// Optional: Initialize with ChatGPT visible
function switchTab(tab) {
    // Containers
    const chatgptContainer = document.getElementById('chatgpt-container');
    const chatgptFooter = document.getElementById('chatgpt-bot-footer');
    const deepseekContainer = document.getElementById('deepseek-container');
    const deepseekFooter = document.getElementById('deepseek-bot-footer');

    // Buttons
    const tabChatGPT = document.getElementById('tab-chatgpt');
    const tabDeepSeek = document.getElementById('tab-deepseek');

    if (tab === 'chatgpt') {
        chatgptContainer.style.display = 'block';
        chatgptFooter.style.display = 'flex';
        deepseekContainer.style.display = 'none';
        deepseekFooter.style.display = 'none';

        tabChatGPT.classList.add('active');
        tabDeepSeek.classList.remove('active');
    } else {
        chatgptContainer.style.display = 'none';
        chatgptFooter.style.display = 'none';
        deepseekContainer.style.display = 'block';
        deepseekFooter.style.display = 'flex';

        tabChatGPT.classList.remove('active');
        tabDeepSeek.classList.add('active');
    }
}

window.switchTab = switchTab;
window.switchTab('chatgpt');

// Delegate click on inner clickable card div (inside deal-section)
document.addEventListener("click", function (event) {
    const cardLink = event.target.closest(".deal-section .card-body > div");

    if (cardLink && cardLink.getAttribute("role") === "link") {
        const url = cardLink.dataset.url || "#";
        if (url !== "#") {
            window.open(url, "_self");
        }
    }
});






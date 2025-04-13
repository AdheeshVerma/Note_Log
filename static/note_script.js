// Wait for DOM to be fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Get common elements
  const titleDiv = document.getElementById('title');
  const normalDiv = document.getElementById('normal');
  const themeButton = document.getElementById("theme-button");
  const themeDropdown = document.getElementById("theme-dropdown");
  const saveButton = document.getElementById('save-button');
  const clearButton = document.getElementById('clear');
  const fontSizeSelector = document.getElementById("fontSizeSelector");
  const imageIcon = document.getElementById("img_icon");
  const imageInput = document.getElementById("imageInput");
  const audioIcon = document.getElementById("uploadAudioIcon");
  const audioInput = document.getElementById("audioInput");
  const noteForm = document.getElementById("note-form");
  const speechButton = document.getElementById('speechButton');
  const speechModal = document.getElementById('speechModal');
  const closeModalBtn = document.querySelector('.close');
  const startRecordBtn = document.getElementById('startRecord');
  const stopRecordBtn = document.getElementById('stopRecord');
  const insertTextBtn = document.getElementById('insertText');
  const transcriptBox = document.getElementById('transcriptBox');

  // ==================== Placeholders ============================== //
  function addPlaceholder(div, placeholderText) {
    if (div.innerHTML.trim() === '') {
      div.classList.add('placeholder');
      div.innerHTML = placeholderText;
    }

    div.addEventListener('focus', function () {
      if (div.classList.contains('placeholder')) {
        div.innerHTML = '';
        div.classList.remove('placeholder');
      }
    });

    div.addEventListener('blur', function () {
      if (div.innerHTML.trim() === '') {
        div.classList.add('placeholder');
        div.innerHTML = placeholderText;
      }
    });
  }

  if (titleDiv) addPlaceholder(titleDiv, 'Title');
  if (normalDiv) addPlaceholder(normalDiv, 'Enter Your Thoughts...');

  // ==================== Theme Management ============================== //
  if (themeButton && themeDropdown) {
    themeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      themeDropdown.style.display = themeDropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", () => {
      if (themeDropdown) {
        themeDropdown.style.display = "none";
      }
    });

    themeDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    const themeOptions = document.querySelectorAll(".theme-option");
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
    const noteIdElement = document.querySelector('#note-form')?.action;
    let noteId;

    if (noteIdElement) {
      const match = noteIdElement.match(/\/edit_note\/(\d+)\//);
      if (match && match[1]) {
        noteId = match[1];
      }
    }

    themeOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const theme = this.getAttribute("data-theme");
        const bgElement = document.querySelector(".bg");

        if (noteId && csrfToken) {
          fetch(`/notes/${noteId}/change-theme/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-CSRFToken': csrfToken
            },
            body: `theme=${theme}`
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                updateThemeUI(theme);
              }
            })
            .catch(error => console.error('Error:', error));
        } else {
          updateThemeUI(theme);
        }
      });
    });

    function updateThemeUI(theme) {
      const bgElement = document.querySelector(".bg");
      if (bgElement) {
        bgElement.setAttribute("data-theme", theme);
        themeDropdown.style.display = "none";
      }
    }
  }

  // ==================== Font Size ============================== //
  if (fontSizeSelector) {
    fontSizeSelector.addEventListener("change", function () {
      setFontSize(this.value);
    });
  }

  function setFontSize(size) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style.fontSize = size;
    span.appendChild(range.extractContents());
    range.insertNode(span);
  }

  // ==================== Text Color ============================== //
  window.changeTextColor = function (color) {
    document.execCommand("foreColor", false, color);
  };

  // ==================== Clear Button ============================== //
  if (clearButton) {
    clearButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (confirm('Are you sure you want to clear the content?')) {
        if (titleDiv) titleDiv.innerText = "";
        if (normalDiv) normalDiv.innerHTML = "";
      }
    });
  }

  // ==================== Image Upload ============================== //
  if (imageIcon && imageInput) {
    imageIcon.addEventListener("click", function () {
      imageInput.click();
    });
  }

  if (imageInput) {
    imageInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file && normalDiv) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.style.display = "block";
          img.style.marginBottom = "10px";
          img.style.maxWidth = "50%";
          normalDiv.appendChild(img);

          const lineBreak = document.createElement("br");
          normalDiv.appendChild(lineBreak);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // ==================== Audio Upload ============================== //
  if (audioIcon && audioInput) {
    audioIcon.addEventListener("click", function () {
      audioInput.click();
    });
  }

  if (audioInput) {
    audioInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file && normalDiv) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const audio = document.createElement("audio");
          audio.src = e.target.result;
          audio.controls = true;
          audio.style.display = "block";
          audio.style.marginBottom = "10px";
          normalDiv.appendChild(audio);

          const lineBreak = document.createElement("br");
          normalDiv.appendChild(lineBreak);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // ==================== Save Content ============================== //
  function saveContent() {
    const titleDiv = document.getElementById('title');
    const normalDiv = document.getElementById('normal');
    const titleField = document.getElementById('note-title');
    const contentField = document.getElementById('note-content');
    const noteForm = document.querySelector('form');

    console.log("Save content function called");

    if (titleDiv && titleField) {
      titleField.value = titleDiv.innerHTML;
      console.log("Title saved:", titleField.value);
    }

    if (normalDiv && contentField) {
      contentField.value = normalDiv.innerHTML;
      console.log("Content saved:", contentField.value);
    }

    if (noteForm) {
      console.log("Submitting form");
      noteForm.submit();
    } else {
      console.error("Form not found");
    }
  }

  // Make the function globally accessible if needed
  window.saveContent = saveContent;

  // ==================== Speech to Text ============================== //
  let mediaRecorder;
  let audioChunks = [];

  // Add event listeners for speech to text modal
  if (speechButton) {
    speechButton.addEventListener('click', () => {
      if (speechModal) {
        speechModal.style.display = 'block';
      }
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (speechModal) {
        speechModal.style.display = 'none';
      }
    });
  }

  // Click outside modal to close
  window.addEventListener('click', (e) => {
    if (e.target === speechModal) {
      speechModal.style.display = 'none';
    }
  });

  // Start recording function
  if (startRecordBtn) {
    startRecordBtn.addEventListener('click', async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        
        // Create recording indicator if it doesn't exist
        let recordingStatus = document.getElementById('recordingStatus');
        if (!recordingStatus) {
          recordingStatus = document.createElement('div');
          recordingStatus.id = 'recordingStatus';
          recordingStatus.className = 'recording-status';
          recordingStatus.innerHTML = '<div class="recording-indicator"></div><span>Recording...</span>';
          
          // Insert before transcript box
          if (transcriptBox && transcriptBox.parentNode) {
            transcriptBox.parentNode.insertBefore(recordingStatus, transcriptBox);
          }
        } else {
          recordingStatus.style.display = 'flex';
        }
        
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const formData = new FormData();
          formData.append('audio', audioBlob);
          
          // Update UI
          if (transcriptBox) {
            transcriptBox.textContent = "Processing your speech...";
          }
          
          if (startRecordBtn) startRecordBtn.disabled = true;
          if (stopRecordBtn) stopRecordBtn.disabled = true;
          
          try {
            // Get CSRF token
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
            
            if (csrfToken) {
              // Send to backend for transcription
              const response = await fetch('/transcribe/', {
                method: 'POST',
                body: formData,
                headers: {
                  'X-CSRFToken': csrfToken
                }
              });
              
              if (response.ok) {
                const result = await response.json();
                if (transcriptBox && result.text) {
                  transcriptBox.textContent = result.text;
                } else {
                  transcriptBox.textContent = "No speech detected. Please try again.";
                }
              } else {
                if (transcriptBox) {
                  transcriptBox.textContent = "Error processing speech. Please try again.";
                }
              }
            } else {
              if (transcriptBox) {
                transcriptBox.textContent = "CSRF token not found. Cannot process request.";
              }
            }
          } catch (error) {
            console.error("Error processing speech:", error);
            if (transcriptBox) {
              transcriptBox.textContent = "Error processing speech. Please try again.";
            }
          } finally {
            if (startRecordBtn) startRecordBtn.disabled = false;
            if (stopRecordBtn) stopRecordBtn.disabled = true;
            
            // Hide recording indicator
            const recordingStatus = document.getElementById('recordingStatus');
            if (recordingStatus) {
              recordingStatus.style.display = 'none';
            }
          }
        };
        
        // Start recording
        mediaRecorder.start();
        if (startRecordBtn) startRecordBtn.disabled = true;
        if (stopRecordBtn) stopRecordBtn.disabled = false;
        if (transcriptBox) transcriptBox.textContent = "Recording... Speak now.";
        
      } catch (error) {
        console.error("Error accessing microphone:", error);
        if (transcriptBox) {
          transcriptBox.textContent = "Error accessing microphone. Please check your permissions.";
        }
      }
    });
  }
  
  // Stop recording function
  if (stopRecordBtn) {
    stopRecordBtn.addEventListener('click', () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    });
  }
  
  // Insert transcribed text into note
  if (insertTextBtn && normalDiv) {
    insertTextBtn.addEventListener('click', () => {
      if (transcriptBox && transcriptBox.textContent.trim() !== '') {
        const transcribedText = transcriptBox.textContent;
        
        // Try to insert at cursor position if possible
        const selection = window.getSelection();
        if (selection.rangeCount > 0 && normalDiv.contains(selection.anchorNode)) {
          const range = selection.getRangeAt(0);
          const textNode = document.createTextNode(transcribedText);
          range.insertNode(textNode);
        } else {
          // Otherwise append to the end
          normalDiv.innerHTML += normalDiv.innerHTML.endsWith('<br>') ? '' : '<br>';
          normalDiv.innerHTML += transcribedText;
        }
        
        // Close modal and reset
        if (speechModal) {
          speechModal.style.display = 'none';
        }
        if (transcriptBox) {
          transcriptBox.textContent = '';
        }
      }
    });
  }

  // Add keyframe animation style for recording indicator
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.4; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(styleElement);
});
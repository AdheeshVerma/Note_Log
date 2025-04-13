document.addEventListener("DOMContentLoaded", () => {
    // Existing code...
  
    // Theme selector functionality
    const themeButton = document.getElementById("theme-button")
    const themeDropdown = document.getElementById("theme-dropdown")
  
    if (themeButton && themeDropdown) {
      // Toggle theme dropdown
      themeButton.addEventListener("click", (e) => {
        e.stopPropagation()
        themeDropdown.style.display = themeDropdown.style.display === "block" ? "none" : "block"
      })
  
      // Close dropdown when clicking outside
      document.addEventListener("click", () => {
        if (themeDropdown) {
          themeDropdown.style.display = "none"
        }
      })
  
      // Prevent dropdown from closing when clicking inside it
      themeDropdown.addEventListener("click", (e) => {
        e.stopPropagation()
      })
  
      // Handle theme selection
      const themeOptions = document.querySelectorAll(".theme-option")
      themeOptions.forEach((option) => {
        option.addEventListener("click", function () {
          const theme = this.getAttribute("data-theme")
          const bgElement = document.querySelector(".bg")
          if (bgElement) {
            bgElement.setAttribute("data-theme", theme)
            themeDropdown.style.display = "none"

          }
        })
      })
  
    }
  })
  
        document.addEventListener('DOMContentLoaded', function() {
            // Connect file inputs to their buttons
            document.getElementById('img_icon').addEventListener('click', function() {
                document.getElementById('imageInput').click();
            });
            
            document.getElementById('uploadAudioIcon').addEventListener('click', function() {
                document.getElementById('audioInput').click();
            });
            
            // Handle image upload
            document.getElementById('imageInput').addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const img = document.createElement('img');
                        img.src = event.target.result;
                        img.style.maxWidth = '100%';
                        document.getElementById('normal').appendChild(img);
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            // Handle font size changes
            document.getElementById('fontSizeSelector').addEventListener('change', function() {
                document.execCommand('fontSize', false, '7');
                const fontElements = document.getElementsByTagName('font');
                for (let i = 0; i < fontElements.length; i++) {
                    if (fontElements[i].size === '7') {
                        fontElements[i].removeAttribute('size');
                        fontElements[i].style.fontSize = this.value;
                    }
                }
            });
            
            // Connect save button to form submission
            document.getElementById('save-button').addEventListener('click', function(e) {
                e.preventDefault();
                saveContent();
                document.getElementById('note-form').submit();
            });
            
            // Clear button functionality
            document.getElementById('clear').addEventListener('click', function() {
                if (confirm('Are you sure you want to clear the content?')) {
                    document.getElementById('normal').innerHTML = '';
                }
            });
        });
        
        function saveContent() {
            var title = document.getElementById('title').innerHTML;
            document.getElementById('note-title').value = title;
    
            var content = document.getElementById('normal').innerHTML;
            document.getElementById('note-content').value = content;
        }
        
        function changeTextColor(color) {
            document.execCommand('foreColor', false, color);
        }

        // Handle theme selection
const themeOptions = document.querySelectorAll(".theme-option")
const noteId = document.getElementById('editor-container').dataset.noteId;
const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value

themeOptions.forEach((option) => {
  option.addEventListener("click", function () {
    const theme = this.getAttribute("data-theme")
    
    // Send AJAX request to Django backend
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
        // Update the UI with the new theme
        const bgElement = document.querySelector(".bg")
        if (bgElement) {
          bgElement.setAttribute("data-theme", theme)
          themeDropdown.style.display = "none"
        }
      }
    })
    .catch(error => console.error('Error:', error))
  })
})

    // Font dropdown functionality
    document.addEventListener('DOMContentLoaded', function() {
        const fontButton = document.getElementById('font-button');
        const fontDropdown = document.getElementById('font-dropdown');
        const fontOptions = document.querySelectorAll('.font-option');
        
        // Toggle font dropdown
        fontButton.addEventListener('click', function(e) {
            e.stopPropagation();
            fontDropdown.classList.toggle('active');
            
            // Close theme dropdown if open
            const themeDropdown = document.getElementById('theme-dropdown');
            if (themeDropdown && themeDropdown.classList.contains('active')) {
                themeDropdown.classList.remove('active');
            }
        });
        
        // Font selection
        fontOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedFont = this.getAttribute('data-font');
                
                // Apply font to selected text
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    if (!range.collapsed) {
                        // Text is selected, apply font to selection
                        const span = document.createElement('span');
                        span.style.fontFamily = selectedFont;
                        range.surroundContents(span);
                    } else {
                        // No text selected, apply to editable div for future typing
                        const editable = document.querySelector('.editable-div');
                        if (editable) {
                            editable.style.fontFamily = selectedFont;
                        }
                    }
                } else {
                    // Fallback - apply to whole content
                    const editable = document.querySelector('.editable-div');
                    if (editable) {
                        editable.style.fontFamily = selectedFont;
                    }
                }
                
                // Close dropdown after selection
                fontDropdown.classList.remove('active');
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!fontButton.contains(e.target) && !fontDropdown.contains(e.target)) {
                fontDropdown.classList.remove('active');
            }
        });
    });

    document.getElementById('speechButton').addEventListener('click', () => {
        document.getElementById('speechModal').style.display = 'block';
      });
      
      document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('speechModal').style.display = 'none';
      });
              let mediaRecorder, audioChunks = [];
      
      document.getElementById('speechButton').addEventListener('click', () => {
        document.getElementById('speechModal').style.display = 'block';
      });
      
      document.getElementById('startRecord').addEventListener('click', async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const formData = new FormData();
          formData.append('audio', audioBlob);
          
          // Send to Django backend
          const response = await fetch('/transcribe/', {
            method: 'POST',
            body: formData,
            headers: { "X-CSRFToken": "{{ csrf_token }}" }
          });
          
          const transcript = await response.json();
          document.getElementById('transcriptBox').innerText = transcript.text;
        };
        
        mediaRecorder.start();
        document.getElementById('stopRecord').disabled = false;
      });
      
      document.getElementById('stopRecord').addEventListener('click', () => {
        mediaRecorder.stop();
        audioChunks = [];
      });
      
      document.getElementById('insertText').addEventListener('click', () => {
        const noteContent = document.getElementById('normal');
        noteContent.innerText += '\n' + document.getElementById('transcriptBox').innerText;
        document.getElementById('speechModal').style.display = 'none';
      });
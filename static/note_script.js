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
});

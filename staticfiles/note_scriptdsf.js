
  // ==================== Font Size ============================== //
function setFontSize(size) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return; // No text selected
    const range = selection.getRangeAt(0);

    // Create a span element and set the desired font size
    const span = document.createElement('span');
    span.style.fontSize = size;
    span.appendChild(range.extractContents());  // Wrap the selected text
    range.insertNode(span);  // Insert the span back into the range
  }

  // Event listener for font size dropdown
  document.getElementById("fontSizeSelector").addEventListener("change", function() {
    setFontSize(this.value);
  });

  function changeTextColor(color) {
    document.execCommand("foreColor", false, color);
  }

  // ==================== Clear Button ============================== //

  const clear= document.querySelector('#clear').addEventListener('click',(event)=>{
    event.preventDefault(); // Prevent default form submission
    document.getElementById("title").innerText = "";
    document.getElementById("normal").innerHTML = "";
  })


// ======================== Add Image ============================== //

  document.getElementById("img_icon").addEventListener("click", function() {
    document.getElementById("imageInput").click(); // Trigger file input click
});

document.getElementById("imageInput").addEventListener("change", function(event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.display = "block";
            img.style.marginBottom = "10px";
            const imageDisplay = document.getElementById("normal");
            // imageDisplay.innerHTML = ''; // Clear previous image
            imageDisplay.appendChild(img); // Add new image
            const lineBreak = document.createElement("br");
            imageDisplay.appendChild(lineBreak);
        }
        reader.readAsDataURL(file); // Convert the file to Data URL
    }
});

// ======================== Add Audi0 ============================== //

// Handle the click event to open the file input for audio files
document.getElementById("uploadAudioIcon").addEventListener("click", function() {
  document.getElementById("audioInput").click(); // Trigger file input click
});

document.getElementById("audioInput").addEventListener("change", function(event) {
  const file = event.target.files[0]; // Get the selected file
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const audio = document.createElement("audio");
          audio.src = e.target.result;
          audio.controls = true; // Enable audio controls (play, pause, etc.)


          audio.style.display = "block";
          audio.style.marginBottom = "10px"; 

          const audioDisplay = document.getElementById("normal");
          audioDisplay.appendChild(audio);
          
          const lineBreak = document.createElement("br");
          audioDisplay.appendChild(lineBreak);
      }
      reader.readAsDataURL(file); // Convert the audio file to a Data URL
  }
});


// ======================== Place Holders ============================== //

const titleDiv = document.getElementById('title');
const normalDiv = document.getElementById('normal');

function addPlaceholder(div, placeholderText) {
  // If the div is empty or contains only the placeholder, show the placeholder
  if (div.innerHTML.trim() === '') {
    div.classList.add('placeholder');
    div.innerHTML = placeholderText;
  }

  // On focus (user clicks), remove the placeholder
  div.addEventListener('focus', function() {
    if (div.classList.contains('placeholder')) {
      div.innerHTML = '';
      div.classList.remove('placeholder');
    }
  });

  // On blur (when user clicks away), restore placeholder if div is empty
  div.addEventListener('blur', function() {
    if (div.innerHTML.trim() === '') {
      div.classList.add('placeholder');
      div.innerHTML = placeholderText;
    }
  });
}

// Add placeholders to the title and content divs
addPlaceholder(titleDiv, 'Title');
addPlaceholder(normalDiv, 'Enter Your Thoughts...');

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
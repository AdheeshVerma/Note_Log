
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

  // ====================Save Button============================== //

  const button= document.querySelector('#save').addEventListener('click',(event)=>{
    event.preventDefault(); // Prevent default form submission

    const notes = document.getElementById('normal').innerHTML; // Retrieve normal content
    const title = document.getElementById('title').innerText; // Retrieve title content
    const timeit = new Date().toLocaleString();

    localStorage.setItem('SavedNotes', notes); // Store in localStorage
    localStorage.setItem('SavedTitle', title); // Store in localStorage
    localStorage.setItem('SavedTime', timeit); // Store in localStorage
    alert("Notes saved!");

    console.log('SavedNotes :', notes);
    console.log('SavedTitle :', title);
    console.log('SavedTime :', timeit);
  })

  // ====================== Retreiv notes ============================== //

  const retreiver = document.querySelector('#retreive').addEventListener('click',(event)=>{
    event.preventDefault();
    const savedNotes = localStorage.getItem('SavedNotes');
    const savedTitle = localStorage.getItem('SavedTitle');
    const savedTime = localStorage.getItem('SavedTime');
            if (savedNotes && savedTime) {
                document.getElementById('normal').innerHTML = `${savedNotes} <br> <br> Saved on: ${savedTime}`;
                document.querySelector('#title').innerHTML = savedTitle;
                alert("Notes retrieved!");
            } else {
                alert("No notes found.");
            }
        
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

    // ======================== Clear Storage ============================== //

document.getElementById('storage_clear').addEventListener("click",function(){
  localStorage.setItem('SavedNotes', "");
  localStorage.setItem('SavedTitle', "");
  localStorage.setItem('SavedTime', "");
})
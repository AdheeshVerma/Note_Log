// Replace your theme JavaScript with this updated version
document.addEventListener("DOMContentLoaded", () => {
  // Existing code remains...

  // Theme selector functionality - with debugging
  const themeButton = document.getElementById("theme-button")
  const themeDropdown = document.getElementById("theme-dropdown")

  if (!themeButton) {
    console.error("Theme button not found!")
  }

  if (!themeDropdown) {
    console.error("Theme dropdown not found!")
  }

  if (themeButton && themeDropdown) {
    console.log("Theme elements found successfully")

    // Toggle theme dropdown
    themeButton.addEventListener("click", (e) => {
      e.stopPropagation()
      console.log("Theme button clicked")
      themeDropdown.style.display = themeDropdown.style.display === "block" ? "none" : "block"
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      themeDropdown.style.display = "none"
    })

    // Prevent dropdown from closing when clicking inside it
    themeDropdown.addEventListener("click", (e) => {
      e.stopPropagation()
    })

    // Handle theme selection
    const themeOptions = document.querySelectorAll(".theme-option")
    console.log("Found theme options:", themeOptions.length)

    themeOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const theme = this.getAttribute("data-theme")
        console.log("Selected theme:", theme)

        const bgElement = document.querySelector(".bg")
        if (bgElement) {
          console.log("Found .bg element, applying theme")
          bgElement.setAttribute("data-theme", theme)

          // Direct style application as a backup method
          if (theme === "default") {
            bgElement.style.backgroundImage = "none"
            bgElement.style.backgroundColor = "white"
          } else if (theme === "nature") {
            bgElement.style.backgroundImage =
              "url('" +
              document
                .querySelector('.theme-option[data-theme="nature"] .theme-preview')
                .style.backgroundImage.slice(5, -2) +
              "')"
            bgElement.style.backgroundSize = "cover"
          } else if (theme === "abstract") {
            bgElement.style.backgroundImage =
              "url('" +
              document
                .querySelector('.theme-option[data-theme="abstract"] .theme-preview')
                .style.backgroundImage.slice(5, -2) +
              "')"
            bgElement.style.backgroundSize = "cover"
          } else if (theme === "minimal") {
            bgElement.style.backgroundImage =
              "url('" +
              document
                .querySelector('.theme-option[data-theme="minimal"] .theme-preview')
                .style.backgroundImage.slice(5, -2) +
              "')"
            bgElement.style.backgroundSize = "cover"
          }
           else if (theme === "love") {
            bgElement.style.backgroundImage =
              "url('" +
              document
                .querySelector('.theme-option[data-theme="love"] .theme-preview')
                .style.backgroundImage.slice(5, -2) +
              "')"
            bgElement.style.backgroundSize = "cover"
          }

          themeDropdown.style.display = "none"
          localStorage.setItem("selectedTheme", theme)
        } else {
          console.error("Could not find .bg element!")
        }
      })
    })

    // Apply saved theme on page load
    const savedTheme = localStorage.getItem("selectedTheme")
    if (savedTheme) {
      console.log("Applying saved theme:", savedTheme)
      const bgElement = document.querySelector(".bg")
      if (bgElement) {
        bgElement.setAttribute("data-theme", savedTheme)

        // Direct style application as a backup
        if (savedTheme !== "default") {
          const previewElement = document.querySelector(`.theme-option[data-theme="${savedTheme}"] .theme-preview`)
          if (previewElement) {
            const bgImageUrl = previewElement.style.backgroundImage.slice(5, -2)
            bgElement.style.backgroundImage = `url('${bgImageUrl}')`
            bgElement.style.backgroundSize = "cover"
          }
        }
      }
    }
  }
})

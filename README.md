# 📝 Notelog

A powerful, personal, and fully customizable note-taking web app built with **Django**, **HTML/CSS**, and **JavaScript**.  
Whether you're jotting down ideas, organizing thoughts, or recording voice memos — Notelog has your back. 🎤📓✨

---

## 🌐 Live Demo

Check it out live here 👉 [https://note-log.onrender.com/](https://note-log.onrender.com/)

---

## 🚀 Features

- 🔐 **User Authentication** – Sign up, log in, and securely access your notes
- 📝 **Rich Text Editor** – Customize your notes with:
  - Bold, Italic, Underline
  - Font size and color
- 🎤 **Speech-to-Text** – Speak your notes into existence
- 🌈 **Custom Themes** – Choose your background vibe (light/dark/custom themes)
- 🔤 **Font Changer** – Personalize font styles and make your writing feel yours
- 🖼️ **Image & Audio Attachments** – Add multimedia to your notes
- 🧠 **Intuitive UI** – Clean, responsive, and distraction-free interface

---

## 🛠️ Tech Stack

- **Backend**: Django
- **Frontend**: HTML, CSS, JavaScript
- **Database**: PostgreSQL / SQLite (configurable)
- **Deployment**: Render (backend) + Aiven (PostgreSQL)

---

## 🧪 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/notelog.git
   cd notelog
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the development server**
   ```bash
   python manage.py runserver
   ```

---

## 💡 Future Improvements

- 🔁 Auto-saving notes in real time
- 📄 Export notes to PDF
- 🌐 Offline support with service workers
- ☁️ Cloud sync & backups

---

## 👨‍💻 Author

**Adheesh**  
Crafted with 💙 and way too much coffee ☕  

---

## ⭐ Like it?

Give it a ⭐ on GitHub! It means the world 🌍✨


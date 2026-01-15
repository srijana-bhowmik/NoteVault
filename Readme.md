# NoteVault

NoteVault is a lightweight full-stack note-taking application designed to manage notes efficiently using a clean UI and a RESTful backend architecture.

It enables users to create, view, edit, and delete notes with persistent storage powered by MySQL.

# Features

- Create new notes with title and content
- View all saved notes
- Edit/update existing notes
- Delete notes with confirmation
- Clean UI with dynamic rendering
- RESTful API-based backend
- Persistent storage using MySQL

# Tech Stack

Frontend

- HTML
- CSS
- JavaScript (Vanilla JS)
- Fetch API

Backend

- Node.js
- Express.js
- MySQL
- CORS

# Project Structure

- frontend/ → Contains all HTML, CSS, JS for UI
- backend/ → Node.js + Express API routes and DB connection

#  Installation & Setup

1. Clone the Repository

- git clone https://github.com/srijana-bhowmik/NoteVault.git
- cd NoteVault

2. Backend Setup
- Navigate to backend folder
- cd backend
- Install dependencies:  npm install
- Required Backend Packages:  npm install express mysql2 cors

3. MySQL Database Setup

- Create a database and table in MySQL:

CREATE DATABASE notes_app;

USE notes_app;

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

4. Environment Variables Setup

Create a .env file inside the backend folder:

DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=notes_app
DB_PORT=3306

5. Database Configuration

The project uses dotenv for secure configuration.

db.js reads values from .env, while db.example.js provides a sample setup for reference.

6. Enable CORS 

- In index.js:

const cors=require("cors"); 
app.use(cors());   

(This allows frontend running on browser to communicate with backend.)

7. Start Backend Server

node index.js

- Server will start at:  http://localhost:3000/notes

8. Run Frontend

- Simply open index.html in your browser
(or use Live Server in VS Code).

#  API Endpoints

- Method	Endpoint	Description

- GET	     /notes	    Fetch all notes
- GET	   /notes/:id	Fetch note by ID
- POST	 /notes	    Create a new note
- PUT	   /notes/:id	Update a note
- DELETE /notes/:id	Delete a note

# Validation & Error Handling

- Title validation on create and update
- Proper HTTP status codes
- Error handling for server & database failures
- Confirmation before deleting a note


# Future Improvements

- User authentication (login/signup) and authorization using bcrypt
- Search and filter notes 
- Better UI 

# Author

Srijana Bhowmik | B.Tech CSE | Full-Stack Development Enthusiast


# Job Portal Web Application

A full-stack Job Portal web application built with **Node.js**, **Express**, **MongoDB**, and **EJS** templating.  
Users can browse jobs, search by title, apply with resume upload, and manage accounts with role-based dashboards.

---

## Features

- User Registration & Login with role-based access (Admin, Employer, Job Seeker)  
- Browse and search jobs with case-insensitive keyword matching  
- Apply to jobs by submitting details and uploading resume files  
- Responsive, clean UI with Bootstrap and animations 
- Secure data handling with MongoDB and file upload handling  
- Dashboard views for Admin, Employers, and Job Seekers (extendable)  

---

## Technologies Used

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas (Cloud)  
- **Templating:** EJS  
- **Styling:** Bootstrap 5, Custom CSS  
- **File Upload:** Multer  
- **Version Control:** GitHub  

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed (https://nodejs.org/)  
- MongoDB Atlas account (free-tier cluster)  

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jotkaur-6284/job-portal
   cd job-portal

2. Install dependencies:

   npm install

3. Start the server:

    npm start

4. Open your browser and navigate to http://localhost:5000


## Folder Structure

/job-portal
│
├── models/            # Mongoose schemas for Job, User, Application
├── routes/            # Express route handlers (jobs, auth, users)
├── views/             # EJS templates for frontend pages
├── public/            # Static assets (CSS, JS, images)
├── uploads/           # Uploaded resumes stored here
├── server.js          # Express app entry point
├── package.json       # Project dependencies and scripts
└── .env               # Environment variables (not committed)

## Usage

    Browse jobs on the home or jobs page.

    Search jobs by title using the search bar.

    Click “Apply” to apply for a job (resume upload required).

    Register and login to access role-based dashboards.

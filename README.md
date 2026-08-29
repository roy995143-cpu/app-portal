# App Portal

A web portal for uploading, managing, and approving applications with an admin dashboard.

## Features

- **User Upload Interface** - Upload applications (APK, EXE, ZIP files)
- **Admin Dashboard** - Review, approve, and delete app submissions
- **RESTful API** - Backend endpoints for upload and admin management
- **File Storage** - Persistent storage of uploaded applications
- **Admin Authorization** - Bearer token-based authentication

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create an uploads directory:
```bash
mkdir uploads
```

## Running the Application

Start the main server (with upload API):
```bash
npm start
```

The application will run on `http://localhost:3000`

- **Upload Portal**: Open `index.html` in your browser
- **Admin Dashboard**: Open `admin.html` in your browser (requires admin token)

## API Endpoints

### User Endpoints
- `POST /api/upload` - Upload an application file
- `GET /downloads/:filename` - Download an uploaded application

### Admin Endpoints (Requires Bearer Token)
- `GET /api/admin/apps` - List all applications
- `PATCH /api/admin/approve/:id` - Approve an application
- `DELETE /api/admin/delete/:id` - Delete an application and its file

## Security Notes

- Replace `ADMIN_SECRET_KEY` with a secure token in production
- Implement proper JWT or session-based authentication
- Validate file types and sizes on the server
- Add rate limiting and CORS configuration
- Use HTTPS in production

## Project Structure

```
app-portal/
├── index.html          # User upload interface
├── admin.html          # Admin management dashboard
├── server.js           # Main Express server with upload API
├── admin-server.js     # Admin management API
├── package.json        # Project dependencies
├── .gitignore         # Git ignore rules
└── uploads/           # Directory for uploaded files
```

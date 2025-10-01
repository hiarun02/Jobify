# 🚀 Jobify - Job Portal Platform

A full-stack job portal application built with the MERN stack, featuring separate interfaces for job seekers (students) and recruiters. Users can search and apply for jobs, while recruiters can post jobs and manage applications.

<img width="1898" height="864" alt="Screenshot 2025-10-01 235400" src="https://github.com/user-attachments/assets/28be04d6-5867-48cf-974f-fe4df9b34f22" />


## ✨ Features

### 👨‍🎓 For Students/Job Seekers

- **User Authentication**: Secure registration and login
- **Profile Management**: Upload profile photo, resume, and personal information
- **Job Search**: Browse and search through available job listings
- **Job Applications**: Apply to jobs with one click
- **Save Jobs**: Bookmark interesting job opportunities
- **Application Tracking**: View application status and history
- **Responsive Design**: Optimized for all devices

### 👨‍💼 For Recruiters

- **Company Management**: Create and manage company profiles
- **Job Posting**: Post new job opportunities with detailed descriptions
- **Application Management**: View and manage job applications
- **Applicant Tracking**: Review applicant profiles and resumes
- **Company Branding**: Upload company logos and information
- **Dashboard**: Comprehensive overview of jobs and applications

### 🔐 Security & Authentication

- JWT-based authentication
- Role-based access control (Student/Recruiter)
- Secure cookie management
- Password hashing with bcrypt
- Protected routes and middleware

## 🛠️ Tech Stack

### Frontend

- **React** 19.0.0 - Modern UI library
- **Vite** 6.2.5 - Fast build tool and dev server
- **Redux Toolkit** 2.6.1 - State management
- **React Router** 7.4.0 - Client-side routing
- **Tailwind CSS** 4.0.15 - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Axios** 1.8.4 - HTTP client
- **Lucide React** - Beautiful icons

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** 4.21.2 - Web framework
- **MongoDB** with Mongoose 8.12.1 - Database
- **JWT** 9.0.2 - Authentication tokens
- **Multer** 1.4.5 - File upload handling
- **Cloudinary** 2.6.0 - Image storage and management
- **bcryptjs** 3.0.2 - Password hashing
- **CORS** 2.8.5 - Cross-origin resource sharing

## 📁 Project Structure

```
Jobify/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── auth/         # Authentication components
│   │   │   ├── pages/        # Page components
│   │   │   ├── ui/           # UI primitives
│   │   │   └── layout/       # Layout components
│   │   ├── redux/            # State management
│   │   ├── hooks/            # Custom React hooks
│   │   ├── api/              # API integration
│   │   └── lib/              # Utility functions
│   └── package.json
├── backend/                  # Node.js backend application
│   ├── controllers/          # Route controllers
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── middlewares/          # Custom middleware
│   ├── utils/                # Utility functions
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/jobify.git
   cd jobify
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=9123
NODE_ENV=development
MODE=dev

# Database
MONGO_URI=your_mongodb_connection_string

# JWT Secret
SECRET_KEY=your_jwt_secret_key

# Frontend URL
CLIENT_URL=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Create a `.env` file in the frontend directory:

```env
# Backend API URL
VITE_BASE_URL=http://localhost:9123
```

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

   Server will run on `http://localhost:9123`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will run on `http://localhost:5173`

## 🌐 API Endpoints

### Authentication

- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/logout` - User logout
- `POST /api/user/profile/update` - Update user profile

### Jobs

- `GET /api/job/get` - Get all jobs
- `POST /api/job/post` - Post a new job (Recruiter only)
- `GET /api/job/get/:id` - Get job by ID
- `GET /api/job/adminjob` - Get recruiter's jobs
- `POST /api/job/saved` - Save/unsave a job
- `GET /api/job/get-saved-jobs` - Get saved jobs

### Companies

- `POST /api/company/register` - Register a company
- `GET /api/company/get` - Get user's companies
- `GET /api/company/get/:id` - Get company by ID
- `PUT /api/company/update/:id` - Update company information

### Applications

- `GET /api/application/apply/:id` - Apply for a job
- `GET /api/application/get` - Get user's applications
- `GET /api/application/:id/applicants` - Get job applicants
- `POST /api/application/status/:id/update` - Update application status

## 📱 Usage

### For Job Seekers

1. Register as a "Student"
2. Complete your profile with personal information and resume
3. Browse available jobs or use search functionality
4. Apply to jobs that match your interests
5. Track your application status in your profile

### For Recruiters

1. Register as a "Recruiter"
2. Create your company profile
3. Post job opportunities with detailed requirements
4. Review applications from candidates
5. Manage application status and communicate with applicants

## 🎨 UI Components

The application uses a consistent design system built with:

- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **Sonner** for toast notifications
- Custom UI components for buttons, inputs, avatars, etc.

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Role-based Access**: Different permissions for students and recruiters
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: Secure file handling with Multer

## 🚀 Deployment

### Frontend (Vercel)

1. Build the project: `npm run build`
2. Deploy to Vercel with environment variables

### Backend (Render/Railway)

1. Set up environment variables
2. Deploy with start script: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the flexible database
- Cloudinary for image management
- All the open-source contributors

**Happy Job Hunting! 🎯**

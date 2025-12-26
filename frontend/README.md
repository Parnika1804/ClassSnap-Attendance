# SmartAttend - AI-Powered Attendance System

An intelligent attendance management system that automates classroom attendance tracking using AI-powered face recognition.

## Features

- **Teacher Authentication** - Secure login and signup for teachers
- **Class Management** - Create and manage multiple classes with sections
- **Student Management** - Add students with photos for face recognition
- **Smart Attendance** - Upload classroom photos to automatically detect and mark attendance
- **Attendance History** - View past attendance records with filtering options
- **Excel Export** - Export attendance data to Excel for reporting

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: shadcn/ui, Radix UI
- **Backend**: Supabase (Database, Auth, Storage)
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd smartattend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## Usage

1. Create an account at `/auth`
2. Add your classes from the Classes page
3. Add students to each class with their photos
4. Take attendance by uploading a classroom photo
5. View and export attendance history

## License

MIT License



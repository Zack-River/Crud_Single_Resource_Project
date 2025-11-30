# MEAN Stack CRUD Application

A full-stack CRUD application built with **MongoDB**, **Express.js**, **Angular**, and **Node.js** for managing tasks.

## ✨ Features

- ➕ Create new tasks with title, description, and status
- 📋 View all tasks in a beautiful card-based layout
- ✏️ Edit existing tasks
- 🗑️ Delete tasks with confirmation
- 🎨 Modern, responsive UI with gradient backgrounds
- 🔄 Real-time status tracking (Pending, In Progress, Completed)
- ✅ Form validation and error handling

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled for cross-origin requests

**Frontend:**
- Angular 17 (Standalone Components)
- TypeScript
- Reactive Forms
- HttpClient for API communication
- CSS3 with modern design

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - OR use MongoDB Atlas (free cloud database)
- **Angular CLI** - Install globally: `npm install -g @angular/cli`

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
cd ~/projects/Crud_Single_Resource
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start MongoDB (if using local installation)
# On Linux/WSL:
sudo service mongod start

# On macOS:
brew services start mongodb-community

# On Windows:
net start MongoDB

# Start the backend server
npm start
```

The backend server will run on **http://localhost:3000**

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the Angular development server
npm start
```

The frontend application will run on **http://localhost:4200**

## 🔧 Configuration

### MongoDB Connection

The backend uses the `.env` file for configuration. By default, it connects to local MongoDB:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mean-crud-db
```

**To use MongoDB Atlas (Cloud):**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `.env` file:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mean-crud-db?retryWrites=true&w=majority
```

## 📁 Project Structure

```
Crud_Single_Resource/
├── backend/
│   ├── controllers/
│   │   └── taskController.js      # CRUD logic
│   ├── models/
│   │   └── Task.js                # Mongoose schema
│   ├── routes/
│   │   └── tasks.js               # API routes
│   ├── server.js                  # Express server
│   ├── package.json
│   └── .env                       # Environment config
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── task-list/     # List view component
    │   │   │   └── task-form/     # Create/Edit form
    │   │   ├── models/
    │   │   │   └── task.model.ts  # TypeScript interface
    │   │   ├── services/
    │   │   │   └── task.service.ts # HTTP service
    │   │   ├── app.component.ts
    │   │   ├── app.routes.ts
    │   │   └── app.config.ts
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css             # Global styles
    ├── angular.json
    ├── tsconfig.json
    └── package.json
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Example Request Body (POST/PUT)

```json
{
  "title": "Complete project",
  "description": "Finish the MEAN stack CRUD application",
  "status": "in-progress"
}
```

## 🎯 Usage

1. **Open the application**: Navigate to `http://localhost:4200` in your browser

2. **Create a task**: 
   - Click the "+ Add New Task" button
   - Fill in the title, description (optional), and select a status
   - Click "Create Task"

3. **View tasks**: All tasks are displayed on the home page in a card layout

4. **Edit a task**: 
   - Click the "Edit" button on any task card
   - Modify the details
   - Click "Update Task"

5. **Delete a task**: 
   - Click the "Delete" button on any task card
   - Confirm the deletion in the popup

## 🎨 Design Features

- **Gradient Background**: Beautiful purple gradient backdrop
- **Card Layout**: Tasks displayed in responsive grid cards
- **Status Badges**: Color-coded status indicators
  - 🟡 Pending (Yellow)
  - 🔵 In Progress (Blue)
  - 🟢 Completed (Green)
- **Smooth Animations**: Hover effects and transitions
- **Form Validation**: Real-time validation with error messages
- **Loading States**: Spinners for async operations

## 🧪 Testing the Application

### Manual Testing

1. **Create Operation**:
   - Create a task with just a title
   - Create a task with all fields
   - Try to submit an empty form (should show validation errors)

2. **Read Operation**:
   - View the list of all tasks
   - Verify tasks are sorted by creation date (newest first)

3. **Update Operation**:
   - Edit a task and change its status
   - Modify the description
   - Verify changes persist after refresh

4. **Delete Operation**:
   - Delete a task
   - Confirm it's removed from the list

### API Testing with curl

```bash
# Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Testing API","status":"pending"}'

# Get all tasks
curl http://localhost:3000/api/tasks

# Update a task (replace <id> with actual task ID)
curl -X PUT http://localhost:3000/api/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task","status":"completed"}'

# Delete a task
curl -X DELETE http://localhost:3000/api/tasks/<id>
```

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
```
❌ MongoDB connection error
```
- Ensure MongoDB is running: `sudo service mongod status`
- Check your connection string in `.env`
- Verify network access if using MongoDB Atlas

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::3000
```
- Change the PORT in `.env` file
- Or kill the process using port 3000: `lsof -ti:3000 | xargs kill`

### Frontend Issues

**Cannot find module errors:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**CORS errors in browser console:**
- Ensure backend is running on port 3000
- Check that CORS is enabled in `server.js`

## 📝 Development Scripts

### Backend
```bash
npm start       # Start the server with node
npm run dev     # Start with nodemon (auto-restart)
```

### Frontend
```bash
npm start       # Start dev server (ng serve)
npm run build   # Build for production
npm run watch   # Build and watch for changes
```

## 🔮 Future Enhancements

- User authentication and authorization
- Task categories and tags
- Due dates and reminders
- Search and filter functionality
- Sort by different criteria
- Export tasks to CSV/JSON
- Dark mode toggle
- Task priority levels
- File attachments

## 📄 License

This project is open source and available for educational purposes.

## 👥 Author

Built as a demonstration of MEAN stack development.

---

**Enjoy building with the MEAN stack! 🚀**

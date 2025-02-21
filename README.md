# SCIC Assignment

## Project Overview
SCIC Assignment is a task management application that allows users to create, update, and manage tasks efficiently. The platform is built with a MERN (MongoDB, Express.js, React.js, Node.js) stack, ensuring a seamless user experience.

## Live Demo
🔗 [SCIC Assignment Live](https://scic-assignment-9dcaa.web.app)

## Features
- User authentication and data management
- Task creation, updating, and deletion
- Filtering tasks by category
- Responsive UI for a seamless experience

## Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: Firebase
- **Hosting**: Firebase Hosting

## Installation
Follow these steps to run the project locally:

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/scic-assignment.git
   cd scic-assignment/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your MongoDB credentials:
   ```
   DB_USER=your_mongo_username
   DB_PASSWORD=your_mongo_password
   PORT=7000
   ```
4. Start the backend server:
   ```bash
   node index.js
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

## Dependencies
### Backend
- express
- cors
- dotenv
- mongodb

### Frontend
- react
- tailwindcss
- react-router-dom

## Contribution
Feel free to fork this project and submit pull requests. Contributions are always welcome!

## License
This project is open-source and available under the MIT License.

# OuRoom Chat App

https://user-images.githubusercontent.com/75240925/209740193-9382767d-6e3f-42b9-aa4e-c8bce0066053.mp4

OuRoom is a versatile chat application designed for seamless communication between users. It offers a platform for both private and group conversations in customizable chat rooms.

## 🌟 Key Features

- Private and group chat functionality
- User account creation and management
- Ability to create, join, and leave chat rooms
- Add or remove participants from chat rooms
- Real-time messaging
- User-friendly interface for easy navigation and communication

This application provides a secure and interactive environment for users to connect, collaborate, and communicate effectively in various settings, whether for personal, professional, or community purposes.

## 🛠️ Technologies Used

- **Frontend**: 
  - React.js
  - React Router for navigation
  - SockJS-client for WebSocket communication
- **Backend**: 
  - Spring Boot
  - WebSocket for real-time communication
- **Authentication**: login and password with bcrypt encryption
- **Build Tool**: Maven

## 🏗️ Project Structure

The project is divided into two main parts:

1. **Backend** ([ouroom-server](https://github.com/mWasyluk/ouroom-server/))
   - REST API controllers
   - WebSocket configuration
   - Service layer
   - Security configuration including password encryption
   - Domain models

2. **Frontend** (ouroom-app (this))
   - React components
   - React Router setup
   - State management
   - WebSocket integration with SockJS-client
   - API integration

## 🔧 Setup and Installation

1. Clone the repository:
   
   ```bash
   git clone https://github.com/mWasyluk/ouroom-app.git
   ```

3. Navigate to the project directory:
   
   ```bash
   cd ouroom-app
   ```

5. Install dependencies and build the project using npm:
   ```bash
   npm install
   ```
   ```bash
   npm run build
   ```

6. Install serve and run the application:
   ```bash
   npm install serve
   ```
   ```bash
   serve -f build -l 3000
   ```

The application will be available at `http://localhost:3000`.

## 📚 API Documentation

API documentation is available in the README.md file of the server's repository , visit [ouroom-server](https://github.com/mWasyluk/ouroom-server)

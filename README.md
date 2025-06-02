# AI-Powered Interview Preparation Platform

## Project Overview
I built a comprehensive interview preparation platform that helps developers/users practice technical interviews by generating personalized questions and providing detailed explanations. 
The application uses AI to create role-specific interview questions and offers features like question management and session tracking.

![Screenshot (35)](https://github.com/user-attachments/assets/5e863eca-b667-405f-94ea-f87a29a5a6fc)
![Screenshot (36)](https://github.com/user-attachments/assets/c129b26d-2d6d-4c9b-a0f7-15161e96c2cf)
![Screenshot (37)](https://github.com/user-attachments/assets/0573fe61-b3e0-4466-830e-55baa8b90d3e)
![Screenshot (38)](https://github.com/user-attachments/assets/56b0a59a-8f61-468c-b0bf-636fc48f4752)
![Screenshot (39)](https://github.com/user-attachments/assets/0c5f85a2-bae9-4c2a-be15-b3457d79c0fa)
![Screenshot (40)](https://github.com/user-attachments/assets/56c3b3dc-0997-47da-8d37-5a1e5b2b518f)
![Screenshot (41)](https://github.com/user-attachments/assets/a49fa3bd-809c-4afc-9837-1aa694dc972f)
![Screenshot (42)](https://github.com/user-attachments/assets/b487878a-60ee-4515-889d-829494c979d2)
![Screenshot (43)](https://github.com/user-attachments/assets/3f64225a-104b-43d3-84c9-e2eccf757d11)
![Screenshot (44)](https://github.com/user-attachments/assets/eab9d5bc-fdce-4a3a-8190-7a2b532b883a)
![Screenshot (45)](https://github.com/user-attachments/assets/78259c76-5f56-44f6-97bc-20e26db6a76e)
![Screenshot (46)](https://github.com/user-attachments/assets/104658c3-348d-4517-b586-65f9795113e8)

![Screenshot (47)](https://github.com/user-attachments/assets/6757650a-d2b8-4041-ae52-d00c26a2f3d1)
![Screenshot (48)](https://github.com/user-attachments/assets/d12588d5-7a98-4650-8645-c0cfd524b64f)
![Screenshot (49)](https://github.com/user-attachments/assets/b48fa73a-680a-44e8-b166-12644216fa57)
![Screenshot (50)](https://github.com/user-attachments/assets/ed6c01dc-98f0-406e-9aef-5c7d7e967fc0)




## Key Features
- **AI-Generated Questions**: Creates customized interview questions based on role, experience level, and focus topics
- **Session Management**: Organized practice sessions with persistent storage
- **Question Management**: Pin important questions, add personal notes, and track progress
- **User Authentication**: Secure registration/login with JWT tokens
- **Profile Management**: User profiles with image upload functionality
- **Concept Explanations**: AI-powered detailed explanations for complex interview questions

## Technical Architecture

### Backend (Node.js/Express)
- **Framework**: Express.js with ES6 modules
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication with bcrypt for password hashing
- **AI Integration**: Google Gemini AI for question generation and explanations
- **File Upload**: Multer for profile image handling

### Database Schema
**Three main models:**
1. **User Model**: Stores user credentials, profile information
2. **Session Model**: Represents practice sessions with role, experience, topics
3. **Question Model**: Individual questions linked to sessions with notes and pin functionality

### API Structure
**Authentication Routes:**
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login  
- GET `/api/auth/profile` - Get user profile
- POST `/api/auth/upload-image` - Profile image upload

**Session Routes:**
- POST `/api/sessions/create` - Create new practice session
- GET `/api/sessions/my-sessions` - Get user's sessions
- GET `/api/sessions/:id` - Get specific session
- DELETE `/api/sessions/:id` - Delete session

**Question Routes:**
- POST `/api/questions/add` - Add questions to session
- POST `/api/questions/:id/pin` - Toggle question pin status
- POST `/api/questions/:id/note` - Update question notes

**AI Routes:**
- POST `/api/ai/generate-questions` - Generate interview questions
- POST `/api/ai/generate-explanation` - Get concept explanations

## Key Technical Implementations

### AI Integration
I integrated Google's Gemini AI to generate contextual interview questions. 
The system takes parameters like role, experience level, and focus topics, then uses carefully crafted prompts to generate relevant questions with answers. 
I implemented response cleaning to handle JSON formatting from the AI output.

### Authentication & Security
Implemented JWT-based authentication with:
- Password hashing using bcrypt
- Protected routes middleware
- Token validation and user session management
- Authorization checks for resource access

### Data Relationships
Designed efficient MongoDB schemas with proper relationships:
- Users have multiple Sessions
- Sessions contain multiple Questions
- Questions can be pinned and have notes
- Proper population of related data in queries

### Error Handling
Comprehensive error handling across all controllers with:
- Input validation
- Database error management
- Proper HTTP status codes
- Structured error responses

## Challenges Faced & Solutions

### AI Response Processing
**Challenge**: Gemini AI responses sometimes included markdown formatting that broke JSON parsing.
**Solution**: Implemented text cleaning logic to remove markdown wrappers before JSON parsing.

### Session-Question Relationship
**Challenge**: Managing complex relationships between sessions and questions efficiently.
**Solution**: Used MongoDB's populate feature with custom sorting to get pinned questions first.

### Authentication Flow
**Challenge**: Securing routes while maintaining good user experience.
**Solution**: Created reusable middleware for JWT validation and user context injection.

## Performance Optimizations
- Used MongoDB indexing for faster queries
- Implemented efficient data population strategies
- Structured responses to minimize data transfer
- Used proper HTTP caching headers for static files

## Scalability Considerations
- Modular controller structure for easy feature additions
- Environment-based configuration
- Separate concerns (auth, AI, data management)
- RESTful API design for potential frontend flexibility

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **AI**: Google Gemini AI
- **Authentication**: JWT, bcryptjs
- **File Upload**: Multer
- **Environment**: dotenv for configuration


This project demonstrates my ability to build full-stack applications, integrate AI services, design efficient database schemas, implement secure authentication, and create scalable backend architectures.

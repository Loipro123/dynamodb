# Employee Management System

A React-based employee management system that allows you to add and view employee records. The application uses AWS Lambda for backend processing and DynamoDB for data storage.

## Features

- Add new employees with name, salary, and year
- View all employees in a table format
- Real-time updates when adding new employees
- Responsive Material-UI design

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Material-UI
  - Axios

- Backend:
  - AWS Lambda
  - DynamoDB
  - AWS API Gateway

## Project Structure

```
amplify/
├── src/                    # React source files
│   ├── App.tsx            # Main application component
│   ├── index.tsx          # Application entry point
│   └── index.css          # Global styles
├── lambda/                 # AWS Lambda functions
│   ├── getEmployees.js    # Function to fetch employees
│   └── addEmployee.js     # Function to add new employee
├── public/                 # Static files
└── amplify.yml            # AWS Amplify configuration
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## API Endpoints

- GET: `https://9wade1xxrl.execute-api.us-east-2.amazonaws.com/dev/employee`
- POST: `https://9wade1xxrl.execute-api.us-east-2.amazonaws.com/dev/employee`

## Deployment

The application is deployed using AWS Amplify. The build process is configured in `amplify.yml`.

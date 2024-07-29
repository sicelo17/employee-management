# Next.js Project

This project is a Next.js application that uses environment variables for configuration and includes URL rewrites for API endpoints.

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine. If not, download and install it from the official website.

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sicelo17/employee-management.git
   cd employee-management

2.  **Install dependencies:**

Run the following command to install the necessary packages:

bash
Copy code
npm install
3. **Create a .env file:**

In the root directory of the project, create a file named .env and add the following line to it:

API_URL = server_url/api

4. **Run the development server:**

Start the development server by running:

npm run dev
This will start the server and you can access the application at http://localhost:3000.

**Configuration**
The .env file contains environment-specific variables. In this project, it is used to configure the API URL for rewrites. Ensure that you add the NEXT_PUBLIC_API_URL variable with the appropriate server URL.

**Scripts**
Development server: npm run dev - Starts the development server at http://localhost:3000.
Production build: npm run build - Builds the application for production.
Start production server: npm start - Starts the production server.

**Troubleshooting**
Environment Variables: Ensure that your .env file is correctly named and placed in the root directory. Double-check the variable names and values.
Dependencies: If you encounter issues during installation, try deleting node_modules and package-lock.json and then running npm install again.
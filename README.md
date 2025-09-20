# Auth Service

This is an authentication service built with Node.js, Express, MongoDB, and Vue.js. It provides user registration, login, and protected routes.

## Backend Setup

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/auth-service.git
   cd auth-service
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the server:
   ```sh
   npm run dev
   ```

## Frontend Setup

### Installation

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run serve
   ```

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Authenticate user and get token

### Protected

- **GET** `/api/protected` - Access protected route (requires token)

## Usage

1. Register a new user via the registration form.
2. Login with the registered user credentials.
3. Access the protected route after logging in.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

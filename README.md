
# React Todo App with API

This project is a fully functional React Todo App built with TypeScript, implementing classic CRUD (Create, Read, Update, Delete) operations. It allows users to add, delete, toggle, and rename todos while interacting with an API.

## Features

1. **Add and Delete Todos**
   - Users can add new todos and delete existing ones.
   - Deletion is handled smoothly, with user feedback provided for success and failure.

2. **Toggle Todo Status**
   - Todos can be marked as completed or uncompleted.
   - The app features a bulk toggle option to mark all todos as completed or uncompleted.
   - Each change is individually tracked, and the server is updated accordingly.

3. **Edit Todo Title**
   - Todos can be renamed by double-clicking on the title.
   - Edits are saved on `Enter` or `onBlur` and can be canceled using the `Esc` key.
   - If the new title is empty, the todo is deleted.
   - A loader is displayed while waiting for the API response, and errors are handled gracefully.

## Technologies Used

- **React**: For building user interfaces.
- **TypeScript**: For static typing and enhanced code quality.
- **API Integration**: To handle backend interactions for CRUD operations.
- **SCSS**: For styling and layout.
- **Prettier**: To ensure consistent code formatting.

## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/srtrace/react_todo-app-with-api.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd react_todo-app-with-api
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

   This will start the app and open it in your default web browser. If not, you can access it at `http://localhost:3000`.

## Demo

Check out the live demo [here](https://srtrace.github.io/react_todo-app-with-api/).

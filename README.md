# Habit Tracker

A Flask-based habit tracking web application that allows users to create, update, and track their habits with a daily streak. The app uses SQLite for data storage and includes a user-friendly frontend interface styled with HTML and CSS.

## Features

- **Create Habits**: Add new habits to track daily.
- **Update Streaks**: Automatically update the daily streak of habits.
- **View Habits**: Retrieve information about a specific habit or view all habits.
- **Delete Habits**: Remove habits from the tracker.
- **Cross-Origin Resource Sharing (CORS)**: Configured for seamless communication between frontend and backend.

## Technologies Used

- **Backend**: Python, Flask, SQLite
- **Frontend**: HTML, CSS
- **Database**: SQLite
- **API Communication**: JSON, RESTful endpoints
- **CORS**: Flask-CORS for cross-origin requests

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd habit-tracker
   ```

2. **Create a Virtual Environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For Linux/Mac
   venv\Scripts\activate     # For Windows
   ```

3. **Install Dependencies**:
   ```bash
   pip install flask flask-cors
   ```

4. **Initialize the Database**:
   Run the application once to automatically create the SQLite database:
   ```bash
   python app.py
   ```

5. **Run the Application**:
   ```bash
   python app.py
   ```

6. **Frontend**:
   - Open the `index.html` file in your browser to interact with the app.

## API Endpoints

1. **Create a Habit**  
   `POST /create-habit`  
   **Request Body**:
   ```json
   {
       "name": "habit_name"
   }
   ```
   **Response**:
   ```json
   {
       "message": "Created habit_name created successfully!"
   }
   ```

2. **Update Streak**  
   `POST /update-streak`  
   **Request Body**:
   ```json
   {
       "name": "habit_name"
   }
   ```
   **Response**:
   ```json
   {
       "message": "Streak for habit_name updated!"
   }
   ```

3. **Get Habit**  
   `GET /get-habit`  
   **Request Body**:
   ```json
   {
       "name": "habit_name"
   }
   ```
   **Response**:
   ```json
   {
       "name": "habit_name",
       "streak": [true, false, ...]
   }
   ```

4. **Delete Habit**  
   `POST /delete-habit`  
   **Request Body**:
   ```json
   {
       "name": "habit_name"
   }
   ```
   **Response**:
   ```json
   {
       "message": "Habit 'habit_name' has been deleted."
   }
   ```

5. **Get All Habits**  
   `GET /get-all`  
   **Response**:
   ```json
   [
       {
           "id": 1,
           "habit_name": "habit_name",
           "streak": "[...]"
       },
       ...
   ]
   ```

## Frontend Features

- **Habit Form**: Allows users to input and submit new habits.
- **Habit Cards**: Displays each habit and its corresponding streak.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Future Enhancements

- Add user authentication for personalized habit tracking.
- Implement streak visualization using charts.
- Add reminders and notifications for habit completion.

## License

This project is licensed under the MIT License.

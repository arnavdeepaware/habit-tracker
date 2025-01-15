import datetime
import json
from flask import Flask, jsonify, request
from flask_cors import CORS 
import sqlite3

#Flask
app = Flask(__name__)
CORS(app)

#sqlite 
def get_db():
    return sqlite3.connect('habits.db')

def init_db():
    connection = get_db()
    cursor = connection.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS habits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            streak JSON
        )
    ''')
    connection.commit()
    connection.close()

init_db()

def print_all_entries():
    connection = get_db()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM habits")
    habits = cursor.fetchall()
    connection.close()

    if habits:
        print("All Habits in Database:")
        for habit in habits:
            print(f"ID: {habit[0]}, Habit Name: {habit[1]}, Streak: {habit[2]}")
    else:
        print("No habits found in the database.")

def delete_habit_by_name(name):
    connection = get_db()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM habits WHERE name = ?", (name,))
    connection.commit()

    # Check if any row was deleted
    if cursor.rowcount > 0:
        connection.close()
        return jsonify({"message": f"Habit '{name}' has been deleted."})
    else:
        connection.close()
        return jsonify({"message": f"Habit '{name}' not found in the database."})

def get_day_from_date():
    today = datetime.date.today()
    start_of_year = datetime.date(today.year, 1, 1)
    days = (today - start_of_year).days

    return days

class habit:
    def __init__(self, name):
        self.name = name
        self.streak = [False] * 365

    def get_name(self):
        return self.name
    
    def get_streak(self):
        return self.streak
    
    def update_streak(self):
        num_of_day = get_day_from_date()
        self.streak[num_of_day] = True

    def to_dict(self):
        return {
            "name": self.name,
            "streak": self.streak
        }

#Endpoint to create a habit
@app.route('/create-habit', methods=['POST'])
def create_habit():
    data = request.get_json()
    name = data.get('name')

    if name:
        #Create a new habit
        habit_instance = habit(name)
        streak_json = json.dumps(habit_instance.get_streak())

        #Start database
        connection = get_db()
        cursor = connection.cursor()

        #Try to add habit to database
        try:
            cursor.execute("INSERT INTO habits (name, streak) VALUES (?, ?)", (name, streak_json))
            connection.commit()
            connection.close()
            return jsonify({"message": f"Created {name} created successfully!"}), 200
        
        #Error for duplicated name
        except sqlite3.IntegrityError:
            connection.close()
            return jsonify({f"Error: Habit '{name}' already exists in the database."}), 400
        
    else:
        return jsonify({"error": "Name is required"}), 400
    

#Endpoint to update Streak
@app.route('/update-streak', methods=["POST"])
def update_streak():
    data = request.get_json()
    name = data.get('name')

    if name:
        #Open Database
        connection = get_db()
        cursor = connection.cursor()

        #Fetch Habit
        cursor.execute("SELECT streak FROM habits WHERE name = ?", (name,))
        habit = cursor.fetchone()

        if habit:
            #Fetch Streak
            streak_json = habit[0]
            streak = json.loads(streak_json)

            #Update Streak
            num_of_day = get_day_from_date()
            streak[num_of_day] = True

            #Convert list back to JSON string
            updated_streak_json = json.dumps(streak)  
            cursor.execute("UPDATE habits SET streak = ? WHERE name = ?", (updated_streak_json, name))
            connection.commit()
            connection.close()
            return jsonify({"message": f"Streak for {name} updated!"}), 200
        else:
            connection.close()
            return jsonify({"error": "habit not found in database"}), 404

    else:
        return jsonify({"error": "Name is required"}), 400


#Endpoint to get streak
@app.route('/get-habit', methods=["GET"])
def get_habit():
    data = request.get_json()
    name = data.get('name')

    if name:
        connection = get_db()
        cursor = connection.cursor()

        cursor.execute("SELECT name, streak FROM habits WHERE name = ?", (name, ))
        habit = cursor.fetchone()
        connection.close()

        if habit:
            habit_name, streak_json = habit
            streak = json.loads(streak_json)
            return jsonify({"name": habit_name, "streak": streak}), 200
        else:
            return jsonify({"error": f"Habit '{habit_name}' not found!"}), 404
    else:
        return jsonify({"error": "Name is required"}), 400


#Endpoint to delete a habit
@app.route('/delete-habit', methods=["POST"])
def delete_habit():
    data = request.get_json()
    name = data.get('name')

    if name:
        return delete_habit_by_name(name)
    else:
        return jsonify({"error": "Name is required"}), 400


#Endpoint to fetch all habits/rows
@app.route('/get-all', methods=["GET"])
def get_all_habits():
    connection = get_db()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM habits")
    habits = cursor.fetchall()
    connection.close()

    if habits:
        habits_list = [
            {"id": habit[0], "habit_name": habit[1], "streak": habit[2]} 
            for habit in habits
        ]
        return json.dumps(habits_list)
    else:
        return json.dumps([])


if __name__ == "__main__":
    app.run(debug=True)
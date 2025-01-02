import { useState } from 'react';
import { Input } from "../src/components/ui/input";
import { Button } from "../src/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../src/components/ui/table";
import { Card, CardContent, CardHeader } from "../src/components/ui/card";

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [habitInput, setHabitInput] = useState('');

  const generateEmptyStreak = () => Array(365).fill(false);

  const createHabit = () => {
    if (habitInput.trim()) {
      setHabits([...habits, {
        name: habitInput.trim(),
        streak: generateEmptyStreak()
      }]);
      setHabitInput('');
    }
  };

  const markComplete = (habitName) => {
    const today = new Date();
    const startOfYear = new Date(2025, 0, 1);
    const dayIndex = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24));

    if (dayIndex >= 0 && dayIndex < 365) {
      setHabits(habits.map(habit => 
        habit.name === habitName
          ? { ...habit, streak: habit.streak.map((day, i) => i === dayIndex ? true : day) }
          : habit
      ));
    }
  };

  const deleteHabit = (habitName) => {
    setHabits(habits.filter(habit => habit.name !== habitName));
  };

  const generateStreakTable = (streak) => {
    const weeks = [];
    let dayOfWeek = 3; // Jan 1, 2025 is Wednesday (3)
    let currentWeek = Array(7).fill(null);

    // Fill in empty cells before Jan 1
    for (let i = 0; i < dayOfWeek; i++) {
      currentWeek[i] = { empty: true };
    }

    streak.forEach((completed, index) => {
      currentWeek[dayOfWeek] = { completed, dayIndex: index };
      
      if (dayOfWeek === 6) {
        weeks.push([...currentWeek]);
        currentWeek = Array(7).fill(null);
        dayOfWeek = 0;
      } else {
        dayOfWeek++;
      }
    });

    // Fill remaining empty cells
    if (dayOfWeek !== 0) {
      for (let i = dayOfWeek; i < 7; i++) {
        currentWeek[i] = { empty: true };
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">Habit Tracker 2025</h1>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              value={habitInput}
              onChange={(e) => setHabitInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createHabit()}
              placeholder="Enter new habit"
            />
            <Button onClick={createHabit}>Create Habit</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {habits.map(habit => (
          <Card key={habit.name}>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h2 className="text-xl font-semibold text-slate-800">{habit.name}</h2>
                <div className="flex gap-2">
                  <Button onClick={() => markComplete(habit.name)} variant="secondary">
                    Mark Complete Today
                  </Button>
                  <Button onClick={() => deleteHabit(habit.name)} variant="destructive">
                    Delete
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <TableHead key={day} className="text-xs text-center p-0">{day}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generateStreakTable(habit.streak).map((week, weekIndex) => (
                      <TableRow key={weekIndex}>
                        {week.map((day, dayIndex) => (
                          <TableCell key={dayIndex} className="p-0">
                            <div
                              className={`streak-cell ${day?.completed ? 'completed' : ''} ${day?.empty ? 'empty' : ''}`}
                              title={day?.dayIndex !== undefined ? `Day ${day.dayIndex + 1}` : ''}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <style jsx>{`
        .streak-cell {
          width: 20px;
          height: 20px;
          border: 1px solid #e2e8f0;
        }
        .streak-cell.completed {
          background-color: #4ade80;
        }
        .streak-cell.empty {
          background-color: #f8f9fa;
        }
        @media (max-width: 640px) {
          .streak-cell {
            width: 12px;
            height: 12px;
          }
        }
      `}</style>
    </div>
  );
}
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react";

function App() {
	const [tasks, setTasks] = useState([
		{
			id: 1,
			text: "Doctor Appointment",
			day: "Feb 5th at 2:30pm",
			reminder: true,
		},
		{
			id: 2,
			text: "Meeting at School",
			day: "Feb 6th at 1:20pm",
			reminder: true,
		},
		{
			id: 3,
			text: "Food Shopping",
			day: "Feb 5th at 4:00pm",
			reminder: false,
		},
	]);

	// Delete Task
	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	return (
		<div className="container">
			<Header title="Task Tracker" />
			{tasks.length > 0 ? (
				<Tasks tasks={tasks} onDelete={deleteTask} />
			) : (
				"No Task Available"
			)}
		</div>
	);
}

export default App;

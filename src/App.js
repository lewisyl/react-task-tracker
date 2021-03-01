import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";

function App() {
	const [showAddTask, setShowAddTask] = useState(false);

	const [tasks, setTasks] = useState([]);

	// Fetching data from localhost json server to app:
	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		};
		getTasks();
	}, []);

	//Fetch ALL Tasks from the localhost json-server
	const fetchTasks = async () => {
		const res = await fetch("http://localhost:5008/tasks");
		const data = await res.json();
		return data;
	};

	//Fetch SINGLE task from the localhost json-server
	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5008/tasks/${id}`);
		const data = await res.json();
		return data;
	};

	// Add Task
	const addTask = async (task) => {
		const res = await fetch(`http://localhost:5008/tasks`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(task),
		});

		const data = await res.json();

		setTasks([...tasks, data]);
	};

	// Delete Task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5008/tasks/${id}`, {
			method: "DELETE",
		});

		setTasks(tasks.filter((task) => task.id !== id));
	};

	// Toggle Reminder
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id);
		const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

		const res = await fetch(`http://localhost:5008/tasks/${id}`, {
			method: "PUT",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(updateTask),
		});

		const data = await res.json();

		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: data.reminder } : task
			)
		);
	};

	return (
		<div className="container">
			<Header
				onAdd={() => setShowAddTask(!showAddTask)}
				showAdd={showAddTask}
			/>
			<p>
				You can add and delete tasks. You can also double click the target task
				to toggle the reminder.
			</p>
			{showAddTask && <AddTask onAdd={addTask} />}
			{tasks.length > 0 ? (
				<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
			) : (
				"No Task Available"
			)}
		</div>
	);
}

export default App;

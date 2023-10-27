import { useState } from 'react';
import './App.css';

function App() {
	const [todoInput, setTodoInput] = useState('');
	const [updateTodoInput, setUpdateTodoInput] = useState('');
	const [todos, setTodos] = useState([]);
	const [id, setId] = useState(0);
	const [todoBeingUpdated, setTodoBeingUpdated] = useState({});

	const handleSubmit = (newTodoTitle) => {
		const toDoData = {
			id: id,
			title: newTodoTitle,
			isComplete: false,
		};
		setTodos((prev) => [...prev, toDoData]);
		setId((prev) => prev + 1);
	};

	const handleCompleteTodo = (todo) => {
		todo.isComplete = !todo.isComplete;

		const index = todos.findIndex((stateTodo) => stateTodo.id === todo.id);

		setTodos((prev) => {
			const todosCopy = [...prev];
			todosCopy[index] = todo;

			return todosCopy;
		});
	};

	const handleDelete = (id) => {
		const index = todos.findIndex((todo) => todo.id === id);

		setTodos((prev) => {
			const todosCopy = [...prev];
			todosCopy.splice(index, 1);

			return todosCopy;
		});
	};

	const handleUpdate = (todo, updatedInput) => {
		const index = todos.findIndex((stateTodo) => todo.id === stateTodo.id);

		setTodos((prev) => {
			const todosCopy = [...prev];
			const updatedTodo = todosCopy[index];

			updatedTodo.title = updatedInput;

			return todosCopy;
		});
	};

	return (
		<div className='App'>
			<div className='create-todo'>
				<p>New Todo:</p>
				<input value={todoInput} onChange={(e) => setTodoInput(e.target.value)} />
				<button onClick={() => handleSubmit(todoInput)}>Submit</button>
			</div>
			<div className='list-todos'>
				{todos.map((todo) => (
					<div
						key={todo.id}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
						}}
					>
						<div
							className='todo'
							style={{
								display: 'flex',
							}}
						>
							<input
								type='checkbox'
								value={todo.isComplete}
								onClick={() => handleCompleteTodo(todo)}
							/>
							<p>{todo.title}</p>
							<p style={{ marginLeft: '10px' }} onClick={() => handleDelete(todo.id)}>
								x
							</p>
						</div>
						<button onClick={() => setTodoBeingUpdated(todo)}>Update todo</button>
						{todoBeingUpdated?.id === todo.id && (
							<div>
								<input
									value={updateTodoInput}
									onChange={(e) => setUpdateTodoInput(e.target.value)}
								/>
								<button onClick={() => handleUpdate(todo, updateTodoInput)}>
									Update
								</button>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default App;

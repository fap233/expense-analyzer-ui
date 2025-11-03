import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
	const [expenses, setExpenses] = useState([]);

	useEffect(() => {
		const fetchExpenses = async () => {
			try {
				const response = await axios.get("http://localhost:3000/expenses");

				setExpenses(response.data);
			} catch (error) {
				console.error("Error fetching expenses.", error);
			}
		};

		fetchExpenses();
	}, []);

	return (
		<div>
			<h1>Expenses Analyzer</h1>
			<h2>My Expenses</h2>
			<ul>
				{expenses.map((expense) => (
					<li key={expense.id}>
						<strong>{expense.description}</strong>
						R$ {expense.amount} -
						<em>({expense.category || "Category undefined"})</em>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;

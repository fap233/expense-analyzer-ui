import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
	const [expenses, setExpenses] = useState([]);

	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("");

	const fetchExpenses = async () => {
		try {
			const response = await axios.get("http://localhost:3000/expenses");

			setExpenses(response.data);
		} catch (error) {
			console.error("Error fetching expenses.", error);
		}
	};

	useEffect(() => {
		fetchExpenses();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!description || !amount) {
			alert("Description and value are required!");
			return;
		}

		try {
			const newExpense = {
				description,
				amount: parseFloat(amount),
				category,
			};

			await axios.post("http://localhost:3000/expenses", newExpense);

			setDescription("");
			setAmount("");
			setCategory("");

			fetchExpenses();
		} catch (error) {
			console.error("Error adding expense:", error);
		}
	};

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

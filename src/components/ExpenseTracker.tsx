import React, { useState } from 'react'
import { useStore } from '../store'

export default function ExpenseTracker() {
    const { expenses, addExpense, removeExpense } = useStore();
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number | "">("");

    const handleAddExpense = () => {
        if (description.trim() === "" || amount === "") return;


        addExpense({
            id: Date.now(),
            description,
            amount: Number(amount),
        });

        setDescription("");
        setAmount("");

    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-300 to-gray-500 '>
            <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-lg'>
                <h1 className='text-4xl font-extrabold mb-3 text-center text-black'>
                    Expense Tracker
                </h1>

                <div className='space-y-4 mb-6'>

                    <input type="text" value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Expense Description'
                        className='w-full px-4 py-3 my-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200' />

                    <input type="number" value={amount}
                        onChange={(e) => setAmount(e.target.value === "" ? "" : +e.target.value)}
                        placeholder='Amount'
                        className='w-full px-4 py-3 my-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200' />
                    <button onClick={handleAddExpense}
                        className='bg-gray-600 text-white w-full px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500'>
                        Add Expense</button>

                </div>

                <ul className='space-y-4 mb-6'>
                    {
                        expenses.map((expense) => (
                            <li key={expense.id} className='flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm transition-transform transform hover:scale-105'>
                                <span className='text-gray-800 font-semibold'>
                                    {expense.description}: <span className='text-gray-600'>
                                        ৳{expense.amount.toFixed(2)}
                                    </span>
                                </span>
                                <button className='bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500'
                                    onClick={() => removeExpense(expense.id)}>
                                    Delete
                                </button>
                            </li>
                        ))
                    }
                </ul>

                <div className='text-center'>
                    <h2 className='text-2xl font-semibold text-gray-700'>
                        Total Expenses:৳ {""}
                        {
                            expenses.reduce((total,expense)=>total+expense.amount,0
                            ).toFixed(2)
                        }
                    </h2>
                </div>
            </div>
        </div>
    )
}

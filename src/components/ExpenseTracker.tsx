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
            </div>
        </div>
    )
}

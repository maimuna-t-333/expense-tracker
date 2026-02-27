import React, { useState } from 'react'
import { useStore } from '../store'

export default function ExpenseTracker() {
    const {expenses, addExpense, removeExpense}=useStore();
    const [description, setDescription]=useState<string>('');
    const [amount, setAmount]=useState<number | "">("");

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-300 to-gray-500 '>
        <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-lg'>
            <h1 className='text-4xl font-extrabold mb-3 text-center text-black'>
                Expense Tracker
            </h1>
        </div>
        </div>
  )
}

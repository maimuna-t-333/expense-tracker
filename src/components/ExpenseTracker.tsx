import React, { useState } from 'react'
import { useStore } from '../store'
import jsPDF from 'jspdf';

export default function ExpenseTracker() {
    const { expenses, addExpense, removeExpense, updateExpense } = useStore();
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number | "">("");

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editDescription, setEditDescription] = useState<string>('');
    const [editAmount, setEditAmount] = useState<number | "">("");

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

    const handleEdit = (id: number, desc: string, amnt: number) => {
        setEditingId(id);
        setEditDescription(desc);
        setEditAmount(amnt)
    }

    const handleSaveEdit = () => {
        if (editingId === null || editDescription.trim() === "" || editAmount === "") return;
        updateExpense(editingId, editDescription, Number(editAmount));
        setEditingId(null);
        setEditDescription("");
        setEditAmount("");
    }

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditDescription("");
        setEditAmount("");
    }

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const total = expenses.reduce((sum, e) => sum + e.amount, 0);

        // Header
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('Expense Report', 105, 20, { align: 'center' });

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(120);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 28, { align: 'center' });
        doc.setTextColor(0);

        // Table header
        doc.setFillColor(75, 85, 99);
        doc.rect(14, 36, 182, 10, 'F');
        doc.setTextColor(255);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Description', 18, 43);
        doc.text('Amount (BDT)', 160, 43);
        doc.setTextColor(0);

        // Table rows
        let y = 53;
        expenses.forEach((expense, index) => {
            if (index % 2 === 0) {
                doc.setFillColor(243, 244, 246);
                doc.rect(14, y - 6, 182, 10, 'F');
            }
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(expense.description, 18, y);
            doc.text(`\u09F3${expense.amount.toFixed(2)}`, 160, y);
            y += 12;
        });

        // Total row
        doc.setFillColor(55, 65, 81);
        doc.rect(14, y - 4, 182, 12, 'F');
        doc.setTextColor(255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Total', 18, y + 4);
        doc.text(`\u09F3${total.toFixed(2)}`, 160, y + 4);

        doc.save('expenses.pdf');
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
                        expenses.map((expense, index) => (
                            <li key={expense.id} className='flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm'>
                                {editingId === expense.id ? (
                                    <div className='space-y-2'>
                                        <input type="text" value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                            className='w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400' />
                                        <input type="number" value={editAmount}
                                            onChange={(e) => setEditAmount(e.target.value === "" ? "" : +e.target.value)}
                                            className='w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:gray-blue-400' />
                                        <div className='flex gap-2 '>
                                            <button onClick={handleSaveEdit}
                                                className='bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition duration-200'>
                                                Save
                                            </button>
                                            <button onClick={handleCancelEdit}
                                                className='bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500 transition duration-200'>
                                                Cancel
                                            </button>

                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex justify-between items-center w-full'>
                                        <span className='text-gray-800 font-bold'>
                                            {index+1}. {expense.description}: <span className='text-gray-600'>
                                                {expense.amount.toFixed(2)}/-
                                            </span>
                                        </span>
                                        <div className='flex gap-3 '>
                                            <button className='bg-gray-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                                onClick={() => handleEdit(expense.id, expense.description, expense.amount)}>
                                                Edit
                                            </button>
                                            <button className='bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500'
                                                onClick={() => removeExpense(expense.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))
                    }
                </ul>

                <div className='text-center space-y-4'>
                    <h2 className='text-2xl font-semibold text-gray-700'>
                        Total Expenses:৳
                        {
                            expenses.reduce((total, expense) => total + expense.amount, 0
                            ).toFixed(2)
                        }
                    </h2>
                    <button onClick={handleDownloadPDF}
                    disabled={expenses.length===0}
                    className='bg-green-600 text-white w-full px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-200 disable:opacity-50 disable:cursor-not-allowed'>
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    )
}

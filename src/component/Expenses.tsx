import { AiFillEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs"
import { useState } from "react";
import { Expense, STORAGE_EXPENSE } from "../types/Types";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router";


type Properties = {
    expenses: Expense[]
    updateExpenses: Function
    userId?: number
    showAddEditExpense: Function,
}

export default function ExpeneseList(props: Properties) {
    const expenses: Expense[] = props.expenses
    const showAddEditExpense = props.showAddEditExpense

    const updateExpenses = props.updateExpenses
    const userId = props.userId

    const navigate = useNavigate();

    function editUserExpense(expense: Expense) {
        localStorage.setItem(STORAGE_EXPENSE, JSON.stringify(expense))
        navigate('/add-edit-expense')
    }

    async function deleteUserExpense(expenseId: any) {

        fetch(`http://localhost:8090/user/${userId}/expense/${expenseId}`, { method: 'DELETE' }).then(response =>

            response.json().then(data => {
                updateExpenses()
            })).catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <div style={{width: '50%'}}>
                {expenses.length > 0 &&
                   
                       <Table striped responsive>
                            <thead>
                                <tr>
                                    <th>Reason</th>
                                    <th>Cost</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((expense: Expense) =>
                                    <tr key={expense.id} >
                                        <td>{expense.reason}</td>
                                        <td>{expense.cost}</td>
                                        <td>{expense.date}</td>
                                        <td>
                                            <Button className="mr-3 ml-3" onClick={() => (editUserExpense(expense))} variant="outline-warning"><AiFillEdit /></Button>
                                            <Button className="mr-3 ml-3" onClick={() => (deleteUserExpense(expense.id))}  variant="outline-danger"><BsTrashFill /></Button>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    }
            </div>
        </>
    )
}

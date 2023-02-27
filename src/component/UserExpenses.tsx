import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import ExpeneseList from './Expenses'
import { Expense, STORAGE_USER, User } from '../types/Types'
import { Button } from 'react-bootstrap'
import NavBar from './NavBar'

export default function UserExpenses() {
    const [expenses, setExpenses] = useState<Expense[]>([])

    const [showAddEditExpense, isAddEditExpense] = useState<boolean>(false)

    const navigate = useNavigate();

    const userStr = localStorage.getItem(STORAGE_USER)
    let user: User | undefined = undefined
    
    if (userStr) {
        user = JSON.parse(userStr)
    } else {
        navigate("/")
    }

    useEffect(() => getUserExpenses(), [])

    function getUserExpenses() {

        fetch(`http://localhost:8090/user/${user?.id}/expenses`).then(response => response.json().then(data => {
            setExpenses(data)
        })).catch(err => {
            console.log(err)
            setExpenses([])
        })
    }

    const handleshowAddEditExpense = () => {
        navigate('/add-edit-expense')
    }

    return (
        <div>
            <NavBar />
            <div className='div-translate-y-20'>
                <div className='d-flex justify-content-center'>
                    {!showAddEditExpense &&
                        <ExpeneseList showAddEditExpense={isAddEditExpense} expenses={expenses} userId={user?.id} updateExpenses={getUserExpenses} />}
                </div>
                <div className='d-flex justify-content-center'>
                    <Button onClick={handleshowAddEditExpense}>Add Expense</Button>
                </div>
            </div>
        </div>
    )
}

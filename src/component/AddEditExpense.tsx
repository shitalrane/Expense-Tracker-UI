import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Expense, STORAGE_USER, User, STORAGE_EXPENSE } from '../types/Types';
import { useNavigate } from 'react-router';
import NavBar from './NavBar';
import { Alert } from 'react-bootstrap';


export default function AddEditExpense() {

  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const [show, isShow] = useState(false)
  const [variant, setVariant] = useState('')

  let isEdit = false;

  const navigate = useNavigate();

  const userStr = localStorage.getItem(STORAGE_USER)
  let userObj: User
  if (userStr) {
    userObj = JSON.parse(userStr)
  } else {
    navigate("/")
  }

  const expStr = localStorage.getItem(STORAGE_EXPENSE)

  let expense: Expense | undefined;

  if (expStr) {
    isEdit = true
    expense = JSON.parse(expStr)
  }

  const [inputField, setInputFields] = useState(
    {
      reason: expense?.reason ? expense.reason : "",
      cost: expense?.cost ? expense.cost : 0,
      date: expense?.date ? expense.date : ''
    }
  );

  let handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (form.checkValidity() === false) {
      return
    }

    let expenseReq: Expense = {
      reason: inputField.reason,
      cost: inputField.cost,
      date: inputField.date
    }

    let url = `http://localhost:8090/user/${userObj?.id}/expense`;
    let method = 'POST'

    if (isEdit) {
      url = `http://localhost:8090/user/${userObj?.id}/expense/${expense?.id}`
      method = 'PUT'
    }

    fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseReq)
    }).then(res => res.json().then(data => {
      localStorage.removeItem(STORAGE_EXPENSE)    
      if ((isEdit && res.status === 200) || res.status === 201) {
        setVariant('success')
        isShow(true)
        setMessage(data.msg);
      } else {
        setVariant('danger')
        isShow(true)
        setMessage(data.msg);
      }
      navigate('/userexpenses')
    })).catch(e => console.log(e))
  }

  const cancelAddExpense = () => {

    localStorage.removeItem(STORAGE_EXPENSE)
    navigate('/userexpenses')
  }

  const updateReason = (reason: string) => {
    setInputFields({ ...inputField, reason: reason })
  }

  const updateCost = (cost: string) => {
    setInputFields({ ...inputField, cost: parseInt(cost) })
  }

  const updateDate = (date: string) => {
    setInputFields({ ...inputField, date: date })
  }

  return (
    <>
      {show &&
        <Alert variant={variant} onClose={() => isShow(false)} dismissible>
          <Alert.Heading>
            {variant == 'danger' ? 'Error!' : 'Success'}</Alert.Heading>
          <p>
            {message}
          </p>
        </Alert>
      }
      <NavBar />
      <div className='d-flex justify-content-center div-translate-y-20'>

        <Form className='form' noValidate validated={validated} onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicReason">
            <Form.Label>Reason</Form.Label>
            <Form.Control value={inputField.reason} type="text" placeholder="Reason" onChange={(e) => updateReason(e.target.value)} required />
            <Form.Control.Feedback type="invalid">
              Please provide a Reason.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCost">
            <Form.Label>Cost</Form.Label>
            <Form.Control value={inputField.cost} type="number" min={'1'} placeholder="Cost" onChange={(e) => updateCost(e.target.value)} required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid cost.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Date</Form.Label>
            <Form.Control value={inputField.date} type="date" placeholder="Date" onChange={(e) => updateDate(e.target.value)} required />
            <Form.Control.Feedback type="invalid">
              Please provide a date.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>

          <Button variant="danger" onClick={cancelAddExpense} >
            Cancel
          </Button>
        </Form>
      </div>
    </>
  );
}
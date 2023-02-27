import RegisterForm from './component/UserRegister';
// import UserList from './component/userList';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserExpenses from './component/UserExpenses';
import LoginPage from './component/UserLogin';
import AddEditExpense from './component/AddEditExpense';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/registerform" element={<RegisterForm />} />
          <Route path="/userexpenses" element={<UserExpenses />} />
          <Route path="/add-edit-expense" element={<AddEditExpense />} />
        </Routes>

      </Router>
    </>
  )
}

export default App;

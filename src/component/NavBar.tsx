import { useNavigate } from 'react-router';
import { STORAGE_USER, User } from '../types/Types';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';


export default function NavBar() {

    const navigate = useNavigate();
    const userStr = localStorage.getItem(STORAGE_USER)

    let user: User| undefined = undefined

    if (userStr) {
        user = JSON.parse(userStr)
    }

    const takeAction = () => {
        if(user){
            localStorage.clear()
        }

        navigate('/')
    }

    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Expense Tracker</Navbar.Brand>
          <NavDropdown className='dropdown-menu-right' style={{flex: 'end'}} title={user?.firstName? user.firstName: 'Already User?'} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={takeAction}>{user?'Logout': 'Login'}</NavDropdown.Item>
            </NavDropdown>

        </Container>
      </Navbar>
    )
}

import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Link href="/" passHref>
        <Navbar.Brand>Employee Management</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/create-employee" passHref>
            <Nav.Link>Create Employee</Nav.Link>
          </Link>
          <Link href="/view-employees" passHref>
            <Nav.Link>View Employees</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;

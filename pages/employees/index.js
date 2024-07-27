import { Layout } from '@/layout/Layout';
import { useState, useEffect } from 'react';
import { Table, Button, FormControl } from 'react-bootstrap';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import next from 'next';

const ItemType = 'ROW';

const DraggableRow = ({ index, id, moveRow, data }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item) => {
      if (item.index !== index) {
        moveRow(item.index, index);
        item.index = index;
      }
    },
  });

  const encodedName = encodeURIComponent(data.employee_name);

  return (
    <tr ref={(node) => ref(drop(node))} style={{ cursor: 'move' }}>
     <td>
     <Link href={`/employees/${encodedName}`} passHref>
          <span>{data.employee_name}</span>
        </Link>
      </td>
      <td>{data.last_name}</td>
      <td>{data.gender}</td>
     
      <td>{data.company}</td>
      <td>{data.country}</td>
      <td>{data.schooluniversity}</td>
      <td>{data.qualification}</td>
      <td>{data.level}</td>
      <td>{data.year_of_completion}</td>
      <td>{data.class_grade}</td>
    </tr>
  );
};

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const fields = JSON.stringify([
          "employee_name", 
          "last_name", 
          "gender", 
          "job_title", 
          "company", 
          "country", 
          "education.schooluniversity",
          "education.qualification",
          "education.level",
          "education.year_of_completion",
          "education.class_grade"
        ]);

        const url = `/api/resource/Employee%20Test?fields=${encodeURIComponent(fields)}`;
        
        const response = await fetch(url, {
          next: { revalidate: 30 },
          headers: {
            'Authorization': 'token 61cbbeddebf298f:71d86f85911a40e',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setEmployees(data.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRow = employees[dragIndex];
    const newEmployees = [...employees];
    newEmployees.splice(dragIndex, 1);
    newEmployees.splice(hoverIndex, 0, dragRow);
    setEmployees(newEmployees);
  };

  const filteredEmployees = employees.filter(employee =>
    Object.values(employee).some(value =>
      value !== null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mt-4">
        <h1 className="mb-4">View Employees</h1>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <FormControl
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-25"
          />
          <Button variant="primary" href="/employees/create">
            <FaPlus className="mr-2" />
            Add Employee
          </Button>
        </div>
        <Table bordered striped hover responsive>
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Gender</th>
              <th>Company</th>
              <th>Country</th>
              <th>University</th>
              <th>Qualification</th>
              <th>Level</th>
              <th>Graduation Year</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <DraggableRow
                key={index}
                index={index}
                id={index}
                data={employee}
                moveRow={moveRow}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </DndProvider>
  );
};

export default ViewEmployees;

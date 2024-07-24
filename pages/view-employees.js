import { Layout } from '@/layout/Layout';
import { useState } from 'react';
import { Table, Button, FormControl } from 'react-bootstrap';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaPlus } from 'react-icons/fa';

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

  return (
    <tr ref={(node) => ref(drop(node))} style={{ cursor: 'move' }}>
      <td>{data.name}</td>
      <td>{data.surname}</td>
      <td>{data.gender}</td>
      <td>{data.grade}</td>
      <td>{data.company}</td>
      <td>{data.country}</td>
      <td>{data.university}</td>
      <td>{data.qualification}</td>
      <td>{data.level}</td>
      <td>{data.graduationYear}</td>
      <td>{data.eduGrade}</td>
    </tr>
  );
};

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([
    // Sample employee data
    {
      name: 'John',
      surname: 'Doe',
      gender: 'Male',
      grade: 'A',
      company: 'Company1',
      country: 'Zimbabwe',
      university: 'University1',
      qualification: 'BSc',
      level: 'Under graduate',
      graduationYear: '2020',
      eduGrade: 'First Class',
    },
    {
      name: 'Jane',
      surname: 'Smith',
      gender: 'Female',
      grade: 'B',
      company: 'Company2',
      country: 'Zimbabwe',
      university: 'University2',
      qualification: 'BA',
      level: 'Under graduate',
      graduationYear: '2019',
      eduGrade: 'Second Class',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRow = employees[dragIndex];
    const newEmployees = [...employees];
    newEmployees.splice(dragIndex, 1);
    newEmployees.splice(hoverIndex, 0, dragRow);
    setEmployees(newEmployees);
  };

  const filteredEmployees = employees.filter(employee =>
    Object.values(employee).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
            <Button variant="primary" href="/create-employee">
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
                <th>Grade</th>
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

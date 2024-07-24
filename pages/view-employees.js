import { Layout } from '@/layout/Layout';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
    <tr ref={(node) => ref(drop(node))}>
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

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRow = employees[dragIndex];
    const newEmployees = [...employees];
    newEmployees.splice(dragIndex, 1);
    newEmployees.splice(hoverIndex, 0, dragRow);
    setEmployees(newEmployees);
  };

  return (
      <DndProvider backend={HTML5Backend}>
        <div className="container">
          <h1>View Employees</h1>
          <Table bordered>
            <thead>
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
              {employees.map((employee, index) => (
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

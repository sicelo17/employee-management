import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Tabs, Tab, Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EmployeeDetails = () => {
  const router = useRouter();
  const { name } = router.query;
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState(null);
  
  const decodedName = decodeURIComponent(name);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const decodedName = decodeURIComponent(name);
        const response = await axios.get(`/api/resource/Employee%20Test/${decodedName}`, {
          headers: {
            'Authorization': 'token 61cbbeddebf298f:71d86f85911a40e',
          },
        });
        
        setEmployee(response.data.data);
        setFormData(response.data.data)
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    const fetchLevels = async () => {
      try {
        const fields = JSON.stringify(["level"]);
        const response = await axios.get(`/api/resource/Employee%20Education?fields=${encodeURIComponent(fields)}`,
        {
          headers: {
            'Authorization': 'token 61cbbeddebf298f:71d86f85911a40e',
          },
        });
        console.log(response.data);
        setLevelOptions(response.data); 
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };

    if (name) {
      fetchEmployee();
      fetchLevels();
    }
  }, [name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setFormData({
      ...formData,
      education: updatedEducation
    });
  };
  const handleSave = async () => {
    try {
      await axios.put(`/api/resource/Employee%20Test/${decodedName}`, formData , {
        headers: {
          'Authorization': 'token 61cbbeddebf298f:71d86f85911a40e',
        },
      });
      alert('Employee details updated successfully!');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{employee.employee_name} {employee.last_name}</h1>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </div>
      <Tabs defaultActiveKey="details" id="employee-tabs" className="mb-3">
        <Tab eventKey="details" title="Details">
          <Form>
            <Table bordered striped>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>
                    <Form.Control
                      type="text"
                      name="employee_name"
                      value={formData.employee_name || ''}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Surname</th>
                  <td>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={formData.last_name || ''}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>
                    <Form.Control
                      type="text"
                      name="gender"
                      value={formData.gender || ''}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Company</th>
                  <td>
                    <Form.Control
                      type="text"
                      name="company"
                      value={formData.company || ''}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Country</th>
                  <td>
                    <Form.Control
                      type="text"
                      name="country"
                      value={formData.country || ''}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form>
        </Tab>
        <Tab eventKey="education" title="Education">
          <Table bordered striped>
            <thead>
              <tr>
                <th>University</th>
                <th>Qualification</th>
                <th>Level</th>
                <th>Graduation Year</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
            {formData.education && formData.education.map((edu, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        type="text"
                        name={`schooluniversity-${index}`}
                        value={edu.schooluniversity || ''}
                        onChange={(e) => handleEducationChange(index, 'schooluniversity', e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name={`qualification-${index}`}
                        value={edu.qualification || ''}
                        onChange={(e) => handleEducationChange(index, 'qualification', e.target.value)}
                      />
                    </td>
                    {/* <td>
                      <Form.Control
                        as="select"
                        name={`level-${index}`}
                        value={edu.level || ''}
                        onChange={(e) => handleEducationChange(index, 'level', e.target.value)}
                      >
                        <option value="">Select level</option>
                        {levelOptions.map((level) => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </Form.Control>
                    </td> */}
                    <td>
                      <Form.Control
                        type="number"
                        name={`year_of_completion-${index}`}
                        value={edu.year_of_completion || ''}
                        onChange={(e) => handleEducationChange(index, 'year_of_completion', e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name={`class_grade-${index}`}
                        value={edu.class_grade || ''}
                        onChange={(e) => handleEducationChange(index, 'class_grade', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
};

export default EmployeeDetails;

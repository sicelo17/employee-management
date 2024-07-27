import { useState } from 'react';
import { FaArrowCircleRight, FaRegSave } from 'react-icons/fa';
import { Tab, Tabs, Form, Button, Modal, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const CreateEmployee = () => {
  const [key, setKey] = useState('employeeOverall');
  const [show, setShow] = useState(false);
  const [genders, setGenders] = useState(['Male', 'Female']);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    jobTitle: '',
    company: '',
    country: 'Zimbabwe',
    university: '',
    qualification: '',
    level: '',
    graduationYear: '',
    eduGrade: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderAdd = (newGender) => {
    setGenders([...genders, newGender]);
    setFormData({ ...formData, gender: newGender });
    setShow(false);
  };

  const handleGenderSelect = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'add-new-gender') {
      setShow(true);
    } else {
      handleChange(e);
    }
  };

  const handleSave = async () => {
    try {
      const formattedFormData = {
        employee_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        job_title: formData.jobTitle,
        company: formData.company,
        country: formData.country, 
        education: [
          {
            schooluniversity: formData.university,
            qualification: formData.qualification,
            year_of_completion: formData.graduationYear,
            class_grade: formData.eduGrade,
            level: formData.level
          }
        ]
      };
  
      console.log('Formatted Data:', formattedFormData); 
  
      const response = await axios.post(`/api/resource/Employee%20Test`, formattedFormData , {
        headers: {
          'Authorization': 'token 61cbbeddebf298f:71d86f85911a40e',
        },
      });
  
      console.log('Response:', response.data);
      alert('Employee details updated successfully!');
    } catch (error) {
      console.error('Error saving employee:', error.response ? error.response.data : error.message);
      alert('Failed to save employee details. Please check the console for more information.');
    }
  };
  


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '800px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Create Employee</h2>
          <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
            <Tab eventKey="employeeOverall" title="Employee Overall">
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        as="select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleGenderSelect}
                        required
                      >
                        {genders.map((gender) => (
                          <option key={gender} value={gender}>
                            {gender}
                          </option>
                        ))}
                        <option value="add-new-gender">Add New Gender</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Company</Form.Label>
                      <Form.Control
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        as="select"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                      >
                        <option value="Zimbabwe">Zimbabwe</option>
                        {/* Add more countries here */}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center mt-3">
                  <Button variant="primary" onClick={() => setKey('education')}>
                    Next <FaArrowCircleRight />
                  </Button>
                </div>
              </Form>
            </Tab>
            <Tab eventKey="education" title="Education">
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>University</Form.Label>
                      <Form.Control
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Qualification</Form.Label>
                      <Form.Control
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Level</Form.Label>
                      <Form.Control
                        as="select"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                      >
                        <option value="">Select level</option>
                        <option value="Post graduate">Post graduate</option>
                        <option value="Under graduate">Under graduate</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Certificate">Certificate</option>
                        <option value="O'Level">O'Level</option>
                        <option value="A'Level">A'Level</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Graduation Year</Form.Label>
                      <Form.Control
                        type="text"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Grade</Form.Label>
                      <Form.Control
                        name="eduGrade"
                        value={formData.eduGrade}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center mt-3 d-flex align-items-center justify-content-center">
                  <Button variant="success" onClick={handleSave} >
                    Submit <FaRegSave />
                  </Button>
                </div>
              </Form>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      {/* Add Gender Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Gender</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control id="newGender" />
            </Form.Group>
            <div className="text-center mt-3">
              <Button
                variant="success"
                onClick={() => handleGenderAdd(document.getElementById('newGender').value)}
              >
                Add
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateEmployee;

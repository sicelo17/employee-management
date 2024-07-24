import { Layout } from '@/layout/Layout';
import { useState } from 'react';
import { Tab, Tabs, Form, Button, Modal, Row, Col, Card } from 'react-bootstrap';

const CreateEmployee = () => {
  const [key, setKey] = useState('employeeOverall');
  const [show, setShow] = useState(false);
  const [genders, setGenders] = useState(['Male', 'Female']);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    grade: '',
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, index) => currentYear - index);

  const handleGenderSelect = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'add-new-gender') {
      setShow(true);
    } else {
      handleChange(e);
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
                        <Form.Control name="firstName" value={formData.firstName} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="lastName" value={formData.lastName} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" name="gender" value={formData.gender} onChange={handleGenderSelect} required>
                          {genders.map((gender) => (
                            <option key={gender} value={gender}>{gender}</option>
                          ))}
                          <option value="add-new-gender">Add New Gender</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Grade</Form.Label>
                        <Form.Control name="grade" value={formData.grade} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Company</Form.Label>
                        <Form.Control name="company" value={formData.company} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control as="select" name="country" value={formData.country} onChange={handleChange}>
                          <option value="Zimbabwe">Zimbabwe</option>
                          {/* Add more countries here */}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Tab>
              <Tab eventKey="education" title="Education">
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>University</Form.Label>
                        <Form.Control name="university" value={formData.university} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Qualification</Form.Label>
                        <Form.Control name="qualification" value={formData.qualification} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Level</Form.Label>
                        <Form.Control as="select" name="level" value={formData.level} onChange={handleChange}>
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
                        <Form.Control as="select" name="graduationYear" value={formData.graduationYear} onChange={handleChange}>
                          {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Grade</Form.Label>
                        <Form.Control name="eduGrade" value={formData.eduGrade} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Tab>
            </Tabs>
            <div className="text-center mt-3">
              <Button variant="primary">Submit</Button>
            </div>
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
              <Button onClick={() => handleGenderAdd(document.getElementById('newGender').value)}>
                Add
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
  );
};

export default CreateEmployee;

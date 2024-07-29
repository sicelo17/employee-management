import { useState, useEffect } from 'react';
import { FaArrowCircleRight, FaRegSave } from 'react-icons/fa';
import { Tab, Tabs, Form, Button, Modal, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const CreateEmployee = () => {
    const [key, setKey] = useState('employeeOverall');
    const [showGenderModal, setShowGenderModal] = useState(false);
    const [showJobTitleModal, setShowJobTitleModal] = useState(false);
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [genders, setGenders] = useState([]);
    const [jobTitles, setJobTitles] = useState([]);
    const [companies, setCompanies] = useState([]);
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

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const genderResponse = await axios.get('/api/resource/Gender', {
                    headers: { 'Authorization': 'token 61cbbeddebf298f:71d86f85911a40e' },
                });
                const jobTitleResponse = await axios.get('/api/resource/Job%20Title', {
                    headers: { 'Authorization': 'token 61cbbeddebf298f:71d86f85911a40e' },
                });
                const companyResponse = await axios.get('/api/resource/Company', {
                    headers: { 'Authorization': 'token 61cbbeddebf298f:71d86f85911a40e' },
                });

                setGenders(genderResponse.data.data.map(item => item.name));
                setJobTitles(jobTitleResponse.data.data.map(item => item.name));
                setCompanies(companyResponse.data.data.map(item => item.name));
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);


    const handleGenderAdd = async (newGender) => {
        try {
            const response = await axios.post(`/api/resource/Gender`, {
                data: {
                    gender: newGender
                }
            }, {
                headers: {
                    'Authorization': 'token 61cbbeddebf298f:71d86f85911a40e'
                }
            });

            if (response.status === 200) {
                setGenders([...genders, newGender]);
                setFormData({ ...formData, gender: newGender });
                setShowGenderModal(false);
            } else {
                console.error('Error adding gender:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding gender:', error);
        }
    };


    const handleJobTitleAdd = async (newJobTitle) => {
        try {
            const response = await axios.post('/api/resource/Job%20Title', {
                data: { 
                    job_title: newJobTitle 
                }
            }, {
                headers: { 'Authorization': 'token 61cbbeddebf298f:71d86f85911a40e' }
            });

            if (response.status === 200) {
                setJobTitles([...jobTitles, newJobTitle]);
                setFormData({ ...formData, jobTitle: newJobTitle });
                setShowJobTitleModal(false);
            } else {
                console.error('Error adding job title:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding job title:', error);
        }
    };

    

    const handleCompanyAdd = async (newCompany) => {
        const getAbbreviation = (companyName) => {
            return companyName
                .split(' ')
                .map(word => word.charAt(0))
                .join('')
                .toUpperCase();
        };
        
        try {
            const abbreviation = getAbbreviation(newCompany);
            const response = await axios.post(`/api/resource/Company`, {
                data: { 
                    company_name: newCompany,
                    abbr : abbreviation,
                    default_currency: "USD",
                    country: "Zimbabwe"
                 },
            }, {
                headers: { 'Authorization': 'token 61cbbeddebf298f:71d86f85911a40e' }
            });

            if (response.status === 200) {
                setCompanies([...companies, newCompany]);
                setFormData({ ...formData, company: newCompany });
                setShowCompanyModal(false);
            } else {
                console.error('Error adding company:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding company:', error);
        }
    };

    const handleGenderSelect = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'add-new-gender') {
            setShowGenderModal(true);
        } else {
            handleChange(e);
        }
    };

    const handleJobTitleSelect = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'add-new-jobTitle') {
            setShowJobTitleModal(true);
        } else {
            handleChange(e);
        }
    };

    const handleCompanySelect = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'add-new-company') {
            setShowCompanyModal(true);
        } else {
            handleChange(e);
        }
    };

    const handleSave = async () => {
        try {
            // Prepare the payload with document data
            const payload = {
                data: {
                    employee_name: formData.firstName,
                    last_name: formData.lastName,
                    gender: formData.gender,
                    job_title: formData.jobTitle,
                    company: formData.company,
                    country: formData.country,
                    // education: [
                    //     {
                    //         schooluniversity: formData.university,
                    //         qualification: formData.qualification,
                    //         year_of_completion: formData.graduationYear,
                    //         class_grade: formData.eduGrade,
                    //         level: formData.level
                    //     }
                    // ]
                }
            };
    
            const response = await axios.post('/api/resource/Employee%20Test', payload, {
                headers: {
                    'Authorization': 'token 61cbbeddebf298f:71d86f85911a40e',
                    'Content-Type': 'application/json'
                },
            });
    
            alert('Employee details created successfully!');
        } catch (error) {
            console.error('Error creating employee:', error.response ? error.response.data : error.message);
            alert('Failed to create employee details. Please check the console for more information.');
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
                                                as="select"
                                                name="jobTitle"
                                                value={formData.jobTitle}
                                                onChange={handleJobTitleSelect}
                                                required
                                            >
                                                {jobTitles.map((title) => (
                                                    <option key={title} value={title}>
                                                        {title}
                                                    </option>
                                                ))}
                                                <option value="add-new-jobTitle">Add New Job Title</option>
                                            </Form.Control>
                                        </Form.Group>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Company</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleCompanySelect}
                                                required
                                            >
                                                {companies.map((company) => (
                                                    <option key={company} value={company}>
                                                        {company}
                                                    </option>
                                                ))}
                                                <option value="add-new-company">Add New Company</option>
                                            </Form.Control>
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
                                                <option value="O'Level">O&apos;Level</option>
                                                <option value="A'Level">A&apos;Level</option>
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
                                    <Button variant="success" onClick={handleSave}>
                                        Submit <FaRegSave />
                                    </Button>
                                </div>
                            </Form>
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Card>

            {/* Add Gender Modal */}
            <Modal show={showGenderModal} onHide={() => setShowGenderModal(false)}>
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

            {/* Add Job Title Modal */}

            <Modal show={showJobTitleModal} onHide={() => setShowJobTitleModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Job Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control id="newJobTitle" />
                        </Form.Group>
                        <div className="text-center mt-3">
                            <Button variant="success" onClick={() => handleJobTitleAdd(document.getElementById('newJobTitle').value)}>
                                Add
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showCompanyModal} onHide={() => setShowCompanyModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Company</Form.Label>
                            <Form.Control id="newCompany" />
                        </Form.Group>
                        <div className="text-center mt-3">
                            <Button variant="success" onClick={() => handleCompanyAdd(document.getElementById('newCompany').value)}>
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

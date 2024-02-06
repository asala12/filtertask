import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectCard from './ProjectCard';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, selectedType]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://neon-software-eu0z.onrender.com/swProjects/all');
      const data = await response.json();
      setProjects(data.swProjects);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterProjects = () => {
    if (selectedType === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.type === selectedType);
      setFilteredProjects(filtered);
    }
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  const renderTypeOptions = () => {
    const types = ['all', 'Web Development', 'Mobile App Development', 'System Development'];

    return types.map((type, index) => (
      <React.Fragment key={type}>
        <span className={selectedType === type ? 'selected' : ''} onClick={() => handleTypeClick(type)}>
          {type}
        </span>
        {index !== types.length - 1 && <span className="dot"> &middot; </span>}
      </React.Fragment>
    ));
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          {renderTypeOptions()}
        </Col>
      </Row>
      <Row>
        {filteredProjects.map(project => (
          <Col key={project._id} md={4} className="mb-3">
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;

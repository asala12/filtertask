import React from 'react';
import { Card } from 'react-bootstrap';

const ProjectCard = ({ project }) => {
  return (
    <Card>
      <Card.Img variant="top" src={project.imgs[0]} />
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Text>Type: {project.type}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;

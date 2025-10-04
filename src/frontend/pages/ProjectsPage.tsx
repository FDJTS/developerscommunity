import React from 'react';

const ProjectsPage: React.FC<any> = (props) => {
  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>ProjectsPage</h1>
      <p>This page is under construction.</p>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default ProjectsPage;

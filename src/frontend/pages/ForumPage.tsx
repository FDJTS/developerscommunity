import React from 'react';

const ForumPage: React.FC<any> = (props) => {
  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>ForumPage</h1>
      <p>This page is under construction.</p>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default ForumPage;

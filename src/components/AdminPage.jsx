import React from 'react';

function Breadcrumbs({ path }) {
  return (
    <nav className="breadcrumbs">
      {path.map((crumb, index) => (
        <span key={index}>
          {index > 0 && ' > '}
          <a href={crumb.url}>{crumb.label}</a>
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumbs;

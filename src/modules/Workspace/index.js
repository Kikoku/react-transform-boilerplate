import React from 'react';
import { Link, IndexLink } from 'react-router';

const Workspace = ({children}) => (
  <div>
    <nav>
      <IndexLink to="/">Home</IndexLink>{' '}
      <Link to="/pusher">pusher</Link>{' '}
      <Link to="/accountkit">accountKit</Link>
    </nav>
    {children}
  </div>
)

export default Workspace;

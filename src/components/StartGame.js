import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
  return (
    <div>
        <h3>Hello King</h3>
        <h3>Are you ready for game</h3>
        <Link className="button" to="/secondPlay">Yes Start the game</Link>
    </div>
  )
}


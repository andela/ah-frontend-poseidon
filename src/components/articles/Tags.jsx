import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTags } from '@fortawesome/free-solid-svg-icons';

library.add(faTags);
export default ({ tags }) => (
  <div>
    <FontAwesomeIcon icon="tags" />
    {' '}
Tags:
    {tags.map((tag, i) => <a key={i}><span key={i} className="badge badge-info space">{tag}</span></a>)}
  </div>
);

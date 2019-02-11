import React from 'react';
import { Typography } from '@material-ui/core';
import Lists from './ui/Lists';

const listItems = ['Server side rendering', 'Code Splitting', 'Material UI', 'Styled components', 'Structured data', 'React router'];

const Features = () => {
  return (
    <div style={{ marginLeft: 100 }}>
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20 }}>
        Features supported
      </Typography>
      <Lists items={listItems} />
    </div>
  );
};

export default Features;

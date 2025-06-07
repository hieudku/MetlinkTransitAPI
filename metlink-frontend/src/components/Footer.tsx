
import React from 'react';
import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { faCss3Alt } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        fontSize: '5px',
        height: '80px',
        backgroundColor: '#1e1e1e',
        color: 'white',
        textAlign: 'center',
        py: 2,
        borderTop: '3px solidrgb(203, 198, 149)'
      }}
    >
      <Typography variant="body2">
        <FontAwesomeIcon icon={faReact} style={{ marginRight: 8, color: '#61dafb' }} />
        <FontAwesomeIcon icon={faMicrosoft} style={{ marginRight: 8, color: '#f25022' }} />
        <FontAwesomeIcon icon={faCss3Alt} style={{ marginRight: 8, color: '#264de4' }} />
        <p>Built with React, ASP.NET & MUI by Hieu</p>
      </Typography>
    </Box>
  );
};
/* Test trigger pipeline */
export default Footer;

import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ marginBottom: '1rem', color: '#333' }}>
        Frequently Asked Questions
      </Typography>

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ marginBottom: '0.5rem' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h6" sx={{ color: '#007BFF' }}>What is this platform about?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This platform offers a comprehensive online learning experience with a range of courses, interactive content, and community features. Users can browse courses, participate in discussions, and track their progress.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{ marginBottom: '0.5rem' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography variant="h6" sx={{ color: '#007BFF' }}>How can I sign up?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To sign up, simply click on the 'Sign Up' link on the homepage and fill out the registration form. You will need to provide a valid email address and create a password.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{ marginBottom: '0.5rem' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography variant="h6" sx={{ color: '#007BFF' }}>What payment methods are accepted?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We accept various payment methods, including credit/debit cards and PayPal. You can choose your preferred payment method at checkout.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={{ marginBottom: '0.5rem' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography variant="h6" sx={{ color: '#007BFF' }}>How can I contact support?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If you need assistance, you can reach out to our support team through the 'Contact Us' page available in the footer of the site. We also offer support via email at support@example.com.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;

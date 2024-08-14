import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
<<<<<<< HEAD
=======
import { motion } from 'framer-motion';
>>>>>>> main

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem',
<<<<<<< HEAD
        backgroundColor: '#f1f1f1',
        borderRadius: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: '1.5rem', color: '#333' }}>
        Frequently Asked Questions
      </Typography>
      <Divider sx={{ marginBottom: '2rem' }} />

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ marginBottom: '1rem' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography variant="h6" sx={{ color: '#007BFF' }}>What courses do you offer?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our platform offers a wide range of courses across various disciplines, including technology, business, arts, and more. Each course is designed by industry experts and includes video lectures, assignments, and community discussions.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{ marginBottom: '1rem' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
          <Typography variant="h6" sx={{ color: '#007BFF' }}>How can I enroll in a course?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can enroll in a course by signing up or logging into your account. Once logged in, browse the course catalog and click on the "Enroll" button on the course page. Follow the prompts to complete the enrollment process.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{ marginBottom: '1rem' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header">
          <Typography variant="h6" sx={{ color: '#007BFF' }}>Are the courses self-paced?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, most of our courses are self-paced, allowing you to learn at your own speed. However, some courses may have specific schedules or live sessions, which will be clearly mentioned on the course page.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={{ marginBottom: '1rem' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4-content" id="panel4-header">
          <Typography variant="h6" sx={{ color: '#007BFF' }}>What are the payment options available?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We accept a variety of payment methods including credit/debit cards, PayPal, and other online payment systems. All transactions are secure and encrypted to ensure your data is safe.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} sx={{ marginBottom: '1rem' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5-content" id="panel5-header">
          <Typography variant="h6" sx={{ color: '#007BFF' }}>Can I get a refund if I’m not satisfied?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, we offer a 7-day refund policy for most courses. If you're not satisfied with the course, you can request a refund within 7 days of your purchase. Please refer to our refund policy page for more details.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} sx={{ marginBottom: '1rem' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6-content" id="panel6-header">
          <Typography variant="h6" sx={{ color: '#007BFF' }}>How can I contact customer support?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can contact our customer support team via the 'Contact Us' page on our website. We also provide support through email at support@example.com. Our support team is available 24/7 to assist you.
          </Typography>
        </AccordionDetails>
      </Accordion>
=======
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: '1.5rem', color: '#333', fontWeight: 'bold' }}>
        Frequently Asked Questions
      </Typography>
      <Divider sx={{ marginBottom: '2rem', borderColor: '#007BFF' }} />

      {faqData.map((item, index) => (
        <motion.div
          key={item.panel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Accordion expanded={expanded === item.panel} onChange={handleChange(item.panel)} sx={{ marginBottom: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${item.panel}-content`} id={`${item.panel}-header`}>
              <Typography variant="h6" sx={{ color: '#007BFF', fontWeight: 'bold' }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: '#555', lineHeight: '1.6' }}>
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </motion.div>
      ))}
>>>>>>> main
    </Box>
  );
};

<<<<<<< HEAD
=======
const faqData = [
  {
    panel: 'panel1',
    question: 'What courses do you offer?',
    answer: 'Our platform offers a wide range of courses across various disciplines, including technology, business, arts, and more. Each course is designed by industry experts and includes video lectures, assignments, and community discussions.',
  },
  {
    panel: 'panel2',
    question: 'How can I enroll in a course?',
    answer: 'You can enroll in a course by signing up or logging into your account. Once logged in, browse the course catalog and click on the "Enroll" button on the course page. Follow the prompts to complete the enrollment process.',
  },
  {
    panel: 'panel3',
    question: 'Are the courses self-paced?',
    answer: 'Yes, most of our courses are self-paced, allowing you to learn at your own speed. However, some courses may have specific schedules or live sessions, which will be clearly mentioned on the course page.',
  },
  {
    panel: 'panel4',
    question: 'What are the payment options available?',
    answer: 'We accept a variety of payment methods including credit/debit cards, PayPal, and other online payment systems. All transactions are secure and encrypted to ensure your data is safe.',
  },
  {
    panel: 'panel5',
    question: 'Can I get a refund if I’m not satisfied?',
    answer: 'Yes, we offer a 7-day refund policy for most courses. If you\'re not satisfied with the course, you can request a refund within 7 days of your purchase. Please refer to our refund policy page for more details.',
  },
  {
    panel: 'panel6',
    question: 'How can I contact customer support?',
    answer: 'You can contact our customer support team via the \'Contact Us\' page on our website. We also provide support through email at support@example.com. Our support team is available 24/7 to assist you.',
  },
];

>>>>>>> main
export default FAQ;

import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Testcom({}) {
  return (
    <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      Accordion 1
    </AccordionSummary>
    <AccordionDetails>
      
    </AccordionDetails>
    </Accordion>
  )
}

// CustomScrollbarStyles.js
import styled from 'styled-components';

export const CustomScroll = styled.div`
/* Set overflow to auto or scroll */
overflow: auto;

/* Hide scrollbar by default */
::-webkit-scrollbar {
  width: 0;
}

/* Show scrollbar track when overflow occurs */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Show scrollbar handle */
::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 12px;
}

/* Show scrollbar handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #888;
}

/* For Firefox */
scrollbar-width: thin;
scrollbar-color: #555 #f1f1f1;

/* For Firefox - show scrollbar only when overflow occurs */
&:hover {
  scrollbar-width: thin;
}
`;

// CustomScrollbarStyles.js
import styled from 'styled-components';

export const CustomScroll = styled.div`
  /* Add the scrollbar styles here */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }

  ::-webkit-scrollbar-thumb {
    background: #cccaca;
    border-radius: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* For Firefox */
  scrollbar-color: #555 #f1f1f1;
`;

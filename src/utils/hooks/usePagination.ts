import { useState } from 'react';
import { PATIENTS_PER_PAGE, PATIENTS_PER_LOAD } from '../../constants/other';

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState(PATIENTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PATIENTS_PER_PAGE;
  const endIndex = displayedItems;

  const handleLoadMoreClick = () => {
    setDisplayedItems(displayedItems + PATIENTS_PER_LOAD);
  };

  return {
    startIndex,
    endIndex,
    setCurrentPage,
    handleLoadMoreClick
  };
};

export default usePagination;

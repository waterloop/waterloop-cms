import { useCallback } from 'react';


const mockPostings = [
  {
    id: 0,
    openingRole: 'Full Stack Developer',
    subteam: 'TeamHub',
    lastUpdated: 'November 20, 2020',
    openingStatus: 'Accepting responses'
  },
  {
    id: 1,
    openingRole: 'Full Stack Developer',
    subteam: 'TeamHub',
    lastUpdated: 'November 20, 2020',
    openingStatus: 'Accepting responses'
  },
  {
    id: 2,
    openingRole: 'Full Stack Developer',
    subteam: 'TeamHub',
    lastUpdated: 'November 20, 2020',
    openingStatus: 'Accepting responses'
  },
];

const usePostings = () => {
  /**
   * TODO:
   * These all need to make calls to the server eventually
   */
  const edit = useCallback(
    (id, updatedPosting) => {
      console.log(`Editing posting with id: ${id}. The new Posting is ${updatedPosting}`);
    }, []);

  return {
    postings: mockPostings,
    editPosting: edit
  };
};

export default usePostings;

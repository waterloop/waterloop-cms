import { useCallback } from 'react';

const mockHeaders = [
  {
    id: 0,
    header: 'Come Join Us Today! Description',
    editDescriptionUrl: '',
  },
  {
    id: 1,
    header: 'Openings Description',
    editDescriptionUrl: '/postings/editOpenings',
  },
];

const useHeaders = () => {
  /**
   * TODO:
   * These all need to make calls to the server eventually
   */
  const edit = useCallback((id, updatedHeader) => {
    console.log(
      `Editing header with id: ${id}. The new header is ${updatedHeader}`
    );
  }, []);

  return {
    headers: mockHeaders,
    editHeader: edit,
  };
};

export default useHeaders;

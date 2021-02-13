import { useEffect } from 'react';

const useDocTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, []);
};

export default useDocTitle;

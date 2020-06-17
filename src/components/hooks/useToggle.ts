import { useState, useCallback } from 'react';

const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  const [isOpen, setState] = useState(initialState);

  const toggleState = useCallback(() => {
    setState((prevState) => !prevState);
  }, [setState]);

  return [isOpen, toggleState];
};

export default useToggle;

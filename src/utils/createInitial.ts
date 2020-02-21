const createInitial = (firstName: string, lastName: string): string => {
  const initial = (firstName[0] + lastName[0]).toUpperCase();
  return initial;
};

export default createInitial;

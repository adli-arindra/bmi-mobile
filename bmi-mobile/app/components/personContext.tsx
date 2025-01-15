import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PersonType {
  weight: number;
  height: number;
}

interface PersonContextType {
  person: PersonType;
  setPerson: React.Dispatch<React.SetStateAction<PersonType>>;
}

export const personInit = {
    weight: 65,
    height: 175
}

export const personContext = createContext<PersonContextType | undefined>(undefined);

export const usePersonContext = () => {
  const context = useContext(personContext);
  if (!context) {
    throw new Error('usePersonContext must be used within a PersonProvider');
  }
  return context;
};

export const PersonProvider = ({ children }: { children: ReactNode }) => {
  const [person, setPerson] = useState<PersonType>(personInit);

  return (
    <personContext.Provider value={{ person, setPerson }}>
      {children}
    </personContext.Provider>
  );
};

export { PersonType };
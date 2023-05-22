import { ReactNode, createContext, useContext, useState } from "react";

interface ModalInterface {
  header: string;
  body: string;
  rating: number;
}

type ModalActions = {};

const ModalContext = createContext({} as ModalActions);

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setContent] = useState<ModalInterface | null>();

  return (
    <ModalContext.Provider
      value={{
        modalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

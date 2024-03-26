export type ModalPropsType = {
  title: string;
  content?: ({
    closeModal,
    props,
  }: {
    closeModal: () => void;
    props?: Record<string, any>;
  }) => JSX.Element;
  onClose?: () => void;
  onOpen?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  style?: {
    modalContainer?: string;
  };
};

export type ModalRefType = {
  openModal: (options?: { props?: Record<string, any> }) => void;
  closeModal: () => void;
  modalVisible?: boolean;
};

import {
  Fragment,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";

import { ModalPropsType, ModalRefType } from "./type";

const modalSizes = {
  sm: "w-[300px] h-[300px]",
  md: "w-[400px] h-[400px]",
  lg: "w-[500px] h-[500px]",
  xl: "w-[600px] h-[600px]",
  full: "w-[90vw] h-[600px]",
};

export const useModal = (props: ModalPropsType) => {
  const ref = useRef<ModalRefType>(null);

  return {
    openModal: (
      options: Record<string, any> & { props?: Record<string, any> } = {}
    ) => {
      ref.current?.openModal &&
        ref.current?.openModal({ props: options.props || {} });
    },
    closeModal: () => {
      ref.current?.closeModal && ref.current?.closeModal();
    },
    modalControl: {
      ...props,
      modalVisible: ref.current?.modalVisible,
      ref,
    },
  };
};

export const Modal = forwardRef<ModalRefType, ModalPropsType>(
  ({ title, content, onClose, onOpen, size, style }, ref) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [props, setProps] = useState({});

    const closeModal = () => {
      setModalVisible(false);
      if (onClose) {
        onClose();
      }
    };

    const openModal = (options: { props?: Record<string, any> } = {}) => {
      setModalVisible(true);
      setProps(options?.props || {});
      if (onOpen) {
        onOpen();
      }
    };

    useImperativeHandle(ref, () => ({ closeModal, openModal, modalVisible }));

    return (
      <Transition
        show={modalVisible}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="fixed"
        as="div"
      >
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {}}
          unmount={false}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={clsx(
                    "bg-neutral-800 rounded-secondary p-5 md:p-10",
                    modalSizes[size || "sm"],
                    style?.modalContainer,
                    "!h-fit"
                  )}
                >
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-center px-4 py-2 font-bold text-2xl text-neutral-100"
                  >
                    {title}
                  </Dialog.Title>
                  <div>{content && content({ closeModal, props })}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }
);

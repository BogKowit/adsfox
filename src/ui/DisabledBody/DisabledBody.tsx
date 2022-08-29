import React, { ReactNode, FC, useRef, useEffect } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const DisabledBody: FC<Props> = ({ children, isOpen, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (ref.current) {
      if (isOpen) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <div ref={ref} className="fixed inset-0 z-50 h-full overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              onClick={onClose}
              className="absolute inset-0 bg-black bg-opacity-50 transition-opacity "
            />
            <section className="absolute flex h-full w-full items-center justify-center outline-none">
              {children}
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DisabledBody;

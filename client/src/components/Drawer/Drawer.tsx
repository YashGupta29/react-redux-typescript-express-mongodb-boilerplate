import React from "react";
import "./Drawer.css";

// hoc
import OutsideAlerter from "../../hoc/OutsideAlerter";

// interfaces
interface DrawerProps {
  open: boolean;
  anchor: "left" | "right";
  onHide?: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({
  open = false,
  onHide,
  anchor = "left",
  children,
}) => {
  // state
  const [isOpen, setIsOpen] = React.useState(open);

  // function
  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOutsideClick = () => {
    setIsOpen(false);
    onHide && onHide();
  };

  return (
    <div
      className={`drawer-wrapper drawer-${anchor} drawer-${
        isOpen ? "open" : "close"
      }`}
    >
      <OutsideAlerter onOutsideClick={handleOutsideClick}>
        <div
          className={`drawer drawer-${anchor} drawer-${
            isOpen ? "open" : "close"
          }`}
        >
          {children}
        </div>
      </OutsideAlerter>
    </div>
  );
};

export default Drawer;

import React, { memo } from "react";
import "./Tooltip.css";

type Props = {
  children: React.ReactNode;
  title?: string;
  position?: "top" | "bottom" | "left" | "right";
};

const Tooltip: React.FC<Props> = ({
  children,
  title = "Tooltip Text",
  position = "top",
}) => {
  return (
    <div className="tooltip-trigger">
      {children}
      <div className={`tooltip tooltip-${position}`}>{title}</div>
    </div>
  );
};

export default memo(Tooltip);

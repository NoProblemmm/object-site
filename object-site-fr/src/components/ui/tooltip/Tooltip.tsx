import React from "react";
import "./Tooltip.css";
interface TooltipProps {
  message: string;
  children?: React.ReactNode;
}

export default function Tooltip({ message, children }: TooltipProps) {
  return (
    <div className="group relative flex">
      {children}
      <span className="tooltip-content">{message}</span>
    </div>
  );
}

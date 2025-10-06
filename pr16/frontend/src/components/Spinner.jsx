import React from "react";

export default function Spinner({ size = 20, className = "" }) {
  const dimension = typeof size === "number" ? `${size}px` : size;
  return (
    <span
      className={`inline-block align-middle animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      style={{ width: dimension, height: dimension }}
      aria-label="Loading"
      role="status"
    />
  );
}



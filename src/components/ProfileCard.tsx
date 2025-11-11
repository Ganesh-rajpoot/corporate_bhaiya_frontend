import React from "react";

export const Card = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-sm p-6 ${className}`}
      {...props}
    />
  );
};

export const CardContent = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={`mt-4 ${className}`} {...props} />;
};

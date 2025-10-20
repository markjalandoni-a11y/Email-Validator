import React from 'react';

export const GiftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 11.25v8.25a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25v-8.25a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.75 4.5v18m-4.5-18h9a2.25 2.25 0 012.25 2.25v2.25H5.25V6.75A2.25 2.25 0 017.5 4.5z"
    />
  </svg>
);

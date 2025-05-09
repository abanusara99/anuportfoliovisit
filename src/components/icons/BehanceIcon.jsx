import React from 'react';

const BehanceIcon = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M8.26 10.337h4.097c1.94 0 2.917.867 2.917 2.597 0 1.73-.977 2.598-2.917 2.598H8.26v-5.195zm0 7.235h4.283c2.37 0 3.558-1.01 3.558-3.027 0-1.06-.46-1.913-1.38-2.56-.918-.647-2.11-.97-3.57-.97H8.26v6.557zm8.36-9.092c.774 0 1.31.54 1.31 1.25 0 .71-.537 1.25-1.31 1.25s-1.31-.54-1.31-1.25c0-.71.536-1.25 1.31-1.25zm2.57-1.75h-5.14v-.8h5.14v.8z"/>
      <path d="M0 0h24v24H0V0z" fill="none"/>
    </svg>
  );
};

export default BehanceIcon;

import React from 'react';

type Props = {};

function LoadingScreen({}: Props) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90 z-50"
      style={{ backdropFilter: 'blur(10px)' }}>
      <img src="/image/loading.gif" alt="loading" />
    </div>
  );
}

export default LoadingScreen;

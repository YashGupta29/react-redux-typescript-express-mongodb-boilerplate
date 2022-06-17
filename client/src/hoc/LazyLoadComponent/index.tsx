import React from "react";

// loader
import { ClipLoader } from "react-spinners";

interface Props {
  Component: React.LazyExoticComponent<() => JSX.Element>;
  fallback?:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null;
}

const LazyLoadComponent = ({ Component, fallback = <ClipLoader /> }: Props) => {
  return (
    <React.Suspense fallback={fallback}>
      <Component />
    </React.Suspense>
  );
};

export default LazyLoadComponent;

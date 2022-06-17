import React from "react";
import { Helmet } from "react-helmet";

// components
import Header from "../Header/Header";

// interface
interface LayoutProps {
  pageTitle?: string;
  pageDescription?: string;
  header?: boolean;
  footer?: boolean;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  pageTitle,
  pageDescription,
  header = true,
  footer = true,
  children,
}) => {
  return (
    <>
      {(pageTitle || pageDescription) && (
        <Helmet>
          {pageTitle && <title>{String(pageTitle)}</title>}
          {pageDescription && (
            <meta name="description" content={String(pageDescription)} />
          )}
        </Helmet>
      )}
      {header && <Header />}
      {children}
      {/* {footer && <Footer />}; */}
    </>
  );
};

export default Layout;

import { Container, CssBaseline } from "@mui/material";
import { HtmlHTMLAttributes } from "react";
import { CoreLayoutProps } from "react-admin";
import { ErrorBoundary } from "react-error-boundary";

import { Error } from "react-admin";
import Header from "./Header";

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <>
      <CssBaseline />
      <Header />
      <Container sx={{ maxWidth: { xl: 1280 } }}>
        <main id="main-content">
          <ErrorBoundary FallbackComponent={Error}>{children}</ErrorBoundary>
        </main>
      </Container>
    </>
  );
};

export interface LayoutProps
  extends CoreLayoutProps,
    Omit<HtmlHTMLAttributes<HTMLDivElement>, "title"> {}

export default Layout;

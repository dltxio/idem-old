import React from "react";
import Nav from "./Nav";

const Layout = ({header, children, noHeader, activeTab}) => (
  <>
    <header>{noHeader || header || <Nav activeTab={activeTab} />}</header>
    <main>
      <div>{children}</div>
    </main>
  </>
)

export default Layout;

import React, { memo } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { history } from "../Router";

const _Nav = ({ links, noBrand = true, activeTab }) => {
  // Set default links
  if (!links)
    links = [
      { label: "Claims", onClick: () => history.push("/claims") },
      { label: "Sites", onClick: () => history.push("/sites") },
      { label: "Settings", onClick: () => history.push("/settings") },
    ];

  const renderBrand = () => (
    <Navbar.Brand
      style={{ cursor: "pointer" }}
      onClick={() => history.push("/")}
    >
    </Navbar.Brand>
  );

  const renderLinks = () => (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        {links.map(({ label, onClick, children }, i) => {
          const classes = label === activeTab ? "active" : "";
          return !children ? (
            <Nav.Link
              onClick={onClick}
              key={i}
              className={classes}
              children={label}
            />
          ) : (
            <NavDropdown title={label} key={i} className={classes}>
              {children.map((c, ind) => {
                const Item = NavDropdown[c.type];
                return (
                  <Item onClick={c.onClick} key={ind} children={c.label} />
                );
              })}
            </NavDropdown>
          );
        })}
      </Nav>
    </Navbar.Collapse>
  );
  return (
    <Navbar bg="light" expand="lg">
      {!noBrand && renderBrand()}
      {!links.length || <Navbar.Toggle aria-controls="basic-navbar-nav" />}
      {!links.length || renderLinks()}
    </Navbar>
  );
};

export default memo(_Nav);

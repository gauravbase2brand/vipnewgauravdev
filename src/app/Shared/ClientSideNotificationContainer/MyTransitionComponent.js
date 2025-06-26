"use client";
import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const MyTransitionComponent = ({ children }) => {
  return (
    <TransitionGroup>
      {children.map((child) => (
        <CSSTransition key={child.key} classNames="fade" timeout={300}>
          {child}
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default MyTransitionComponent;
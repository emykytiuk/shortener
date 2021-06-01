import * as React from "react";
import { Container } from "reactstrap";

export default class Layout extends React.PureComponent<
  {},
  { children?: React.ReactNode }
> {
  public render() {
    return <Container>{this.props.children}</Container>;
  }
}

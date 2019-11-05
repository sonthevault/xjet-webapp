import React from "react";
import { Button, Spinner } from "reactstrap";
import classnames from "classnames";
import "./styles.css";

export default ({ children, loading, block, ...rest }) => (
  <Button
    {...rest}
    block={block}
    className={classnames({
      "custom-loading-button": true
    })}
  >
    {!(block && !loading) && (
      <Spinner
        className={classnames({
          "position-relative": true,
          "button-style": !block,
          visible: loading,
          invisible: !loading
        })}
        style={{ color: "#ffffff" }}
        size="sm"
        // type="grow"
      />
    )}
    {!(block && loading) && (
      <span
        className={classnames({
          invisible: loading,
          visible: !loading,
          "span-style": !block,
          customLoadingButton: true
        })}
        style={{ color: "#ffffff" }}
      >
        {children}
      </span>
    )}
  </Button>
);

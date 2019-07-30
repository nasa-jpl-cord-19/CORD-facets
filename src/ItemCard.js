import React, { useState } from "react";
import { Button, Card, Collapse } from "@blueprintjs/core";

export default function ItemCard(props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  const {metadata: resultMetadata, ...resultWithoutMetadata} = props.result
  return (
    <Card style={{ margin: "20px 0" }}>
      <h3>{resultMetadata.title}</h3>
      <pre style={{overflow: "scroll"}}>{JSON.stringify(resultMetadata, null, 2)}</pre>
      <Button onClick={handleClick}>
        {isOpen ? "Collapse" : "Expand for other fields"}
      </Button>
      <Collapse isOpen={isOpen}>
        <hr style={{marginTop: "20px"}}/>
        <pre style={{height: "800px", overflow: "scroll"}}>{JSON.stringify(resultWithoutMetadata, null, 2)}</pre>
      </Collapse>
    </Card>
  );
}

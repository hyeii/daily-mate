import React, { useState } from "react";
import "./styles/item.css";
import Checkbox from "./Checkbox";

import Text from "./Text";

interface ItemProps {
  completed?: boolean;
  text: string;
}

const Item = ({ completed, text }: ItemProps) => {
  return (
    <>
      <div className="itemContainer">
        <Checkbox checked={completed} />
        <Text completed={completed}>{text}</Text>
      </div>
    </>
  );
};

export default Item;

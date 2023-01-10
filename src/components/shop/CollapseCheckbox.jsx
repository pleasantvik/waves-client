import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import {
  ListItem,
  List,
  ListItemText,
  Collapse,
  ListItemSecondaryAction,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";

import classes from "./collapse.module.css";

export const CollapseCheckbox = (props) => {
  const [open, setOpen] = useState(props.initState);
  const [checked, setChecked] = useState([]);

  const handleToggle = (val) => {
    const currentIndex = checked.indexOf(val);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(val);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const handleCollapseOpen = () => setOpen(!open);
  const renderList = () =>
    props.list
      ? props.list.map((val) => (
          <ListItem key={val._id}>
            <ListItemText primary={val.name} />
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={() => handleToggle(val._id)}
                checked={checked.indexOf(val._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  return (
    <div className={classes.collapse_items_wrapper}>
      <List>
        <ListItem onClick={handleCollapseOpen}>
          <ListItemText
            primary={props.title}
            className={classes.collapse_title}
          />

          {open && <ArrowDropUp />}
          {!open && <ArrowDropDown />}
        </ListItem>
        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {renderList()}
          </List>
        </Collapse>
      </List>
    </div>
  );
};

import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

import * as Yup from "yup";
import { useFormik } from "formik";
import { errorHelper } from "utils/tools";
import {
  ListItem,
  List,
  ListItemText,
  Collapse,
  ListItemSecondaryAction,
  Checkbox,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import classes from "./collapse.module.css";

export const RangeSelect = (props) => {
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

  console.log(renderList);

  const formik = useFormik({
    initialValues: { min: 0, max: 5000 },
    validationSchema: Yup.object({
      min: Yup.number().min(0, "The minimum is 0"),
      max: Yup.number().max(5000, "The maximum is 5,000"),
    }),

    onSubmit: (values) => {
      props.handleRange([values.min, values.max]);
    },
  });

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
            <form className="mt-3" onSubmit={formik.handleSubmit}>
              <div>
                <TextField
                  style={{
                    width: "100%",
                    fontSize: "1rem",
                    marginTop: "1rem",
                  }}
                  name="min"
                  type="number"
                  label="Min value"
                  variant="outlined"
                  {...formik.getFieldProps("min")}
                  {...errorHelper(formik, "min")}
                />
              </div>
              <div>
                <TextField
                  style={{
                    width: "100%",
                    fontSize: "1rem",
                    marginTop: "1rem",
                  }}
                  name="max"
                  type="number"
                  label="max value"
                  variant="outlined"
                  {...formik.getFieldProps("max")}
                  {...errorHelper(formik, "max")}
                />

                <button
                  className="btn_reuseable"
                  type="submit"
                  style={{
                    color: "#fff",
                    marginTop: "1rem",
                    background: "#101d2c",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

import React from "react";

import { Fragment, useState } from "react";

import classes from "./HomeFooter.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

const HomeFooter = () => {
  return (
    <Fragment>
      <div className={classes["content"]} >
        <div class="row">
          <div class="col-sm" style={{alignItems:"center"}} >
            <h3>Ecommerce</h3>
            <p>Facebook links</p>
          </div>
          <div class="col-sm">
            <p>Form</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeFooter;

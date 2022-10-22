import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { useSelector } from "react-redux";

const OrderLinePart = (props) => {
  const productlist = useSelector((state) => state.product.productlist);

  const productitem = productlist.find((item) => item.id === props.productId);

  return (
    <TableRow key={props.orderLineId}>
      <TableCell component="th" scope="row">
        {props.productId}
      </TableCell>
      <TableCell>{productitem.title}</TableCell>
      <TableCell>{productitem.price}</TableCell>
      <TableCell>{props.quantity}</TableCell>
    </TableRow>
  );
};

export default OrderLinePart;

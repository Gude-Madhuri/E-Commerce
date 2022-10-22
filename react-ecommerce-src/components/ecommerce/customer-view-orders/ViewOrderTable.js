import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "../../UI/Button";
import OrderLinePart from "./OrderLinePart";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const cancelHandler = async (orderId) => {
    const response = await fetch(
      "http://localhost:8080/ecommerce/orders/" + `${orderId}`,
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );

    props.clickLoad();
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderId}
        </TableCell>
        <TableCell>{row.amount}</TableCell>
        <TableCell>{row.orderDate}</TableCell>
        <TableCell>{row.status}</TableCell>
        {/* <TableCell><Button key={row.orderId} onClick={() => cancelHandler(row.orderId)} disabled={ row.status==="shipped" ? true : false }>Cancel</Button></TableCell> */}
        <TableCell>
          <Button
            type="button"
            disabled={
              row.status === "Shipped" || row.status === "In-transit"
                ? true
                : false
            }
            // style={{
            //   backgroundColor:
            //     row.status === "Shipped" || row.status === "In-transit"
            //       ? "lightgray"
            //       : "blue",
    
            // }}
            onClick={() => cancelHandler(row.orderId)}
          >
            Cancel
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Id</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orderLines.map((insideRow) => (
                    // <TableRow key={insideRow.orderLineId}>
                    //   <TableCell component="th" scope="row">
                    //     {insideRow.productId}
                    //   </TableCell>
                    //   <TableCell>Kurthi</TableCell>
                    //   <TableCell>200</TableCell>
                    //   <TableCell>{insideRow.quantity}</TableCell>

                    // </TableRow>
                    <OrderLinePart
                      orderLineId={insideRow.orderLineId}
                      productId={insideRow.productId}
                      quantity={insideRow.quantity}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    orderId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    orderLines: PropTypes.arrayOf(
      PropTypes.shape({
        orderLineId: PropTypes.number.isRequired,
        orderId: PropTypes.number.isRequired,
        productId: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function OrderTable(orderProps) {
  const loadHandler = () => {
    orderProps.loadHandler();
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderProps.rows.map((row) => (
            <Row key={row.orderId} row={row} clickLoad={loadHandler} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

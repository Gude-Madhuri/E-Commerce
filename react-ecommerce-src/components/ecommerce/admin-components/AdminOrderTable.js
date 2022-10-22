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
import OrderLinePart from "../customer-view-orders/OrderLinePart";

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

  const statusUpdateHandler = async (orderId, status) => {
    const response = await fetch(
      "http://localhost:8080/ecommerce/updateStatusByOrderId?orderId=" +
        `${orderId}` +
        "&status=" +
        `${status}`,
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    );

    props.clickLoad();
    console.log("TTT");
    console.log(orderId, status);
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
        <TableCell>{row.userId}</TableCell>
        <TableCell>{row.amount}</TableCell>
        <TableCell>{row.orderDate}</TableCell>
        <TableCell>{row.status}</TableCell>
        {/* <TableCell><Button key={row.orderId} disabled={ row.status==="placed" ? false : true } onClick={() => statusHandler(row.orderId, "shipped")} >Ship</Button>  
        <Button key={row.orderId} disabled={ row.status==="placed" ? false : true } onClick={ () => statusHandler(row.orderId, "rejected")} >Reject</Button></TableCell>
         */}

        <TableCell>
          <select
            disabled={
              row.status === "Rejected" || row.status === "Delivered"
                ? true
                : false
            }
            style={{ borderColor: "black",marginRight:"20px" }}
            onChange={(event) =>
              statusUpdateHandler(row.orderId, event.target.value)
            }
          >
            <option style={{ borderColor: "black" }} value="">
              select
            </option>

            {!(row.status === "In-transit" || row.status === "Delivered") && (
              <option key="Ship" value="Shipped">
                Ship
              </option>
            )}
            {!(row.status === "Delivered") && (
              <option key="In-transit" value="In-transit">
                In-transit
              </option>
            )}
            {
              <option key="Delivered" value="Delivered">
                {" "}
                Delivered{" "}
              </option>
            }
          </select>

          
          <Button
            key={row.orderId}
            disabled={row.status === "Placed" ? false : true}
            // style={{
            //   backgroundColor: row.status === "Placed" ? "red" : "lightgray",
            //   borderRadius: "5px",
            //   borderStyle: "none",
            // }}
            type="button"
            onClick={() => statusUpdateHandler(row.orderId, "Rejected")}
          >
            Reject
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

export default function AdminOrderTable(orderProps) {
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
            <TableCell>User ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
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

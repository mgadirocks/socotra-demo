import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const getPaymentScheduleName = (policyDetails) => {
  if (!policyDetails) {
    return "Not Available";
  }

  if (policyDetails?.paymentScheduleName?.includes("monthly")) {
    return "Monthly";
  }

  if (policyDetails?.paymentScheduleName?.includes("full")) {
    return "Full Payment";
  }
  return policyDetails?.paymentScheduleName;
};

const PolicyDetails = (props) => {
  const handleViewMore = () => {
    window.open(
      `https://sandbox.socotra.com/policy/${props.policyDetails?.locator}/details`,
      "_blank"
    );
  };

  return (
    <div>
      {props.policyDetails?.productName && (
        <section>
          <Typography variant="h6" gutterBottom component="div">
            Policy Details
          </Typography>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Item>Product Name : {props?.policyDetails?.productName}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                Policy Start :{" "}
                {moment(
                  +props?.policyDetails?.originalContractStartTimestamp
                ).format("YYYY/MM/DD")}
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                Policy End :{" "}
                {moment(
                  +props?.policyDetails?.originalContractEndTimestamp
                ).format("YYYY/MM/DD")}
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                Payment Schedule Name :{" "}
                {getPaymentScheduleName(props?.policyDetails)}
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                Home Ownership:{" "}
                {
                  props?.policyDetails?.characteristics[0]?.fieldValues
                    ?.home_ownership?.[0]
                }
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                Date of Birth :{" "}
                {props?.policyDetails?.characteristics[0]?.fieldValues?.dob[0]}
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                Marital Status:{" "}
                {
                  props?.policyDetails?.characteristics[0]?.fieldValues
                    ?.marital_status?.[0]
                }
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                Gender :{" "}
                {
                  props?.policyDetails?.characteristics[0]?.fieldValues
                    ?.gender[0]
                }
              </Item>
            </Grid>
          </Grid>
          <br />
          <Button
            variant="contained"
            style={{ display: "flex", margin: "auto" }}
            onClick={handleViewMore}
          >
            View More
          </Button>
        </section>
      )}
    </div>
  );
};

export default PolicyDetails;

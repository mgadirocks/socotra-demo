import React, { useEffect, useState } from "react";
import { getPolicyDetailsByPolicyId } from "./api";
import moment from "moment";
import { Button, TextField, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { formatPolicyHolderName } from "./utils.js";

const Policies = (props) => {
  const columns = [
    {
      field: "locator",
      headerName: "Policy ID",
      width: 200,
      type: "string",
      renderCell: (params) => {
        return (
          <Link
            style={{ cursor: "pointer" }}
            onClick={(e) =>
              props.handlePolicyDetailsClick(e, params.row.locator)
            }
          >
            {params.row.locator}
          </Link>
        );
      },
    },
    {
      field: "policyName",
      headerName: "Policy Name",
      width: 200,
      valueGetter: (params) => {
        if (!params.row.policyName) {
          return "-";
        }
        const policyName = params.row.policyName;
        return policyName;
      },
    },
    {
      field: "productName",
      headerName: "Product Name",
      width: 200,
      valueGetter: (params) => {
        if (!params.row.productName) {
          return "-";
        }
        // Convert the decimal value to a percentage
        const productName = params.row.productName;
        return productName;
      },
    },
    {
      field: "effectiveContractEndTimestamp",
      headerName: "Policy Effective Date",
      type: "string",
      width: 200,
      valueGetter: (params) => {
        if (!params.row.effectiveContractEndTimestamp) {
          return "";
        }
        // Convert the decimal value to a percentage
        const date1 = moment(+params.row.effectiveContractEndTimestamp).format(
          "YYYY-MM-DD"
        );
        return date1;
      },
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 200,
    //   valueGetter: (params) => {
    //     if (!params.row.status) {
    //       return "-";
    //     }
    //     // Convert the decimal value to a percentage
    //     const productName = params.row.status;
    //     return productName;
    //   },
    // },
  ];

  return (
    <div>
      <br />
      {props.policies?.length > 0 && (
        <section>
          <Typography variant="h5">
            Policies of {formatPolicyHolderName(props.selectedPolicyHolder)}
          </Typography>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              disableRowSelectionOnClick
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              rows={props.policies}
              columns={columns}
              getRowId={(row) => row.locator}
            />
          </Box>
        </section>
      )}
    </div>
  );
};

export default Policies;

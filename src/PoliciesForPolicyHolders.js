import React from 'react'
import Box from "@mui/material/Box";
import { Typography, Link } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getAllPolicyHolders, getPoliciesByPolicyholderIds } from './api';
import moment from "moment";

function PoliciesForPolicyHolders() {
    const [policyHolders, setPolicyHolders] = React.useState([]);

    React.useEffect(() => {
        const loadPolicyHolders = async () => {
            const policyHolders = await getAllPolicyHolders();
            const phIds = policyHolders?.map((ph) => ph.locator);
            const policiesOfPolicyHolders = await getPoliciesByPolicyholderIds(phIds);
            const policyHoldersWithPolicies = policiesOfPolicyHolders?.map((policy) => {
                const policyholder = policyHolders?.find((ph) => ph.locator === policy.policyholderLocator);
                policy.policyholder = policyholder;
                return policy;
            });
            setPolicyHolders(policyHoldersWithPolicies);
        };
        loadPolicyHolders();
    }, []);

    const columns = [
        {
            field: "locator",
            headerName: "Policy ID",
            width: 200,
            type: "string",
        },
        {
            field: "productName",
            headerName: "Product Name",
            width: 200,

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
                const formattedEffectiveDate = moment(+params.row.effectiveContractEndTimestamp).format(
                    "YYYY-MM-DD"
                );
                return formattedEffectiveDate;
            },
        },
        {
            headerName: "Policy Holder Name",
            width: 200,
            valueGetter: (params) => {
                return params.row.policyholder?.entity?.values?.first_name + " " + params.row.policyholder?.entity?.values?.last_name;
            },
        },
    ];
    return (
        <div>
            <Typography variant="h5">
                Policies for Policy Holders
            </Typography>
            <Box sx={{ height: "100%", width: "100%" }}>
                {policyHolders && <DataGrid
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
                    rows={policyHolders}
                    columns={columns}
                    getRowId={(row) => row.locator}
                    onRowClick={(row) => {
                        window.open(
                            `https://sandbox.socotra.com/policy/${row.id}/details`,
                            "_blank"
                        );
                    }}
                />}
            </Box>
        </div>
    )
}

export default PoliciesForPolicyHolders
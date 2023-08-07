import React, { useEffect, useState } from "react";
import {
  getAuthToken,
  getAuthTokenFromLocalStorage,
  getPoliciesByPolicyHolderId,
  searchPolicyHolderByName,
  getPolicyDetailsByPolicyId,
} from "./api";
import moment from "moment";
import { Button, TextField, Typography } from "@mui/material";
import Login from "./Login";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { DataGrid } from "@mui/x-data-grid";
import Policies from "./Policies";
import { formatPolicyHolderName } from "./utils.js";
import PolicyDetails from "./PolicyDetails";

function Policy() {
  const [policyDetails, setPolicyDetails] = useState();
  const [policies, setPolicies] = useState([]);
  const [policyHolderSearch, setPolicyHolderSearch] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [policyHolders, setPolicyHolders] = useState([]);
  const [selectedPolicyHolder, setSelectedPolicyHolder] = useState();

  useEffect(() => {
    document.title = "Policy";
    const token = getAuthTokenFromLocalStorage();
    if (token) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  const handleLoginClick = async (params) => {
    const token = await getAuthToken(params);
    if (token) {
      setIsUserLoggedIn(true);
      window.location.reload();
      alert("Logged In Successfully");
    } else {
      setIsUserLoggedIn(false);
      alert("Invalid Credentials / Login Failed");
    }
  };

  const handleSearchPolicyHolderButtonClick = async () => {
    const searchResults = await searchPolicyHolderByName(policyHolderSearch);
    setPolicyHolders(searchResults);
  };

  const handlePolicyHolderClick = async (policyHolder) => {
    setSelectedPolicyHolder(policyHolder);
    const policyHolderId = policyHolder?.entity?.id;
    const policiesForPolicyHolder = await getPoliciesByPolicyHolderId(
      policyHolderId
    );
    setPolicies(policiesForPolicyHolder);
  };

  const handlePolicyDetailsClick = async (e, policyId) => {
    debugger;
    e.preventDefault();
    const policyDetails = await getPolicyDetailsByPolicyId(policyId);
    setPolicyDetails(policyDetails);
  };

  return (
    <div style={{ margin: "30px" }}>
      {!isUserLoggedIn && <Login onLogin={handleLoginClick} />}
      {isUserLoggedIn && (
        <div>
          <div>
            <section>
              <TextField
                id="policyholder-search"
                label="Search Policy Holder By Name"
                variant="standard"
                style={{ width: "300px" }}
                onChange={(e) => setPolicyHolderSearch(e?.target?.value)}
              />
              {"   "}
              <Button
                onClick={handleSearchPolicyHolderButtonClick}
                variant="contained"
              >
                Search
              </Button>
              <br />
              <br />
              <br />
              {policyHolders.length > 0 && (
                <div>
                  <Typography variant="h5">Search Result(s)</Typography>
                  <Box
                    border={"1px solid #000000"}
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                    }}
                  >
                    <List component="nav" aria-label="secondary mailbox folder">
                      {policyHolders?.map((policyHolder) => (
                        <ListItemButton
                          onClick={(e) => {
                            handlePolicyHolderClick(policyHolder);
                          }}
                        >
                          <ListItemText
                            primary={formatPolicyHolderName(policyHolder)}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Box>
                </div>
              )}
            </section>
            <Policies
              policies={policies}
              selectedPolicyHolder={selectedPolicyHolder}
              handlePolicyDetailsClick={handlePolicyDetailsClick}
            />
            <br />
            <br />
            <br />
            <PolicyDetails policyDetails={policyDetails} />
          </div>
        </div>
      )}
    </div>
  );
}
export default Policy;

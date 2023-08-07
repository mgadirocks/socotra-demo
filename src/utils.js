export const formatPolicyHolderName = (policyHolder) => {
    const firstName = policyHolder?.entity?.values?.first_name?.value[0];
    const lastName = policyHolder?.entity?.values?.last_name?.value[0];
    const policyHolderId =
        policyHolder?.entity?.values?.policyholder_id.value[0];
    return `${firstName} ${lastName} ${policyHolderId}`;
};

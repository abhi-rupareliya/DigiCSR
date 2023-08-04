import React from "react";
import BeneficiaryNavigation from "../../components/Navigation/beneficiaryNavigation";
import Homepage from "../../components/Dashboards/CompanyFeatures/Homepage";

const BeneficiaryDashboard = () => {
  return (
    <div>
      <BeneficiaryNavigation />
      <Homepage userType={"beneficiary"} />
    </div>
  );
};

export default BeneficiaryDashboard;

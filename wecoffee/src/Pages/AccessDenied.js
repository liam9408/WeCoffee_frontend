import React from "react";

const AccessDenied = () => {
  return (
    <>
      <h1 style={{marginTop:"15%"}}>Session Expired</h1>
      <h2 style={{maxWidth:"60%",paddingTop:"15%", color:"navy", fontSize:"30px"}}>Please re-scan QR code to make your order</h2>
    </>
  );
};

export default AccessDenied;

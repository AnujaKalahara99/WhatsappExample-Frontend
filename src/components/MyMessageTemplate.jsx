import React from "react";

const MyMessageTemplate = ({ msg, time, isLink, img, sent }) => {
  return (
    <div className="container card bg-light">
      <div className="container">
        {/* Header */}
        <img
          className="bd-placeholder-img card-img-top"
          src="data:image/jpeg;base64,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"
          alt="placeholder"
        />
      </div>
      <div className="container text-left">
        {/* Body */}
        <p>
          Hi Anuja, Thanks for choosing Tac Traders We are excited to confirm
          that your order #481 has been placed successfully🥰. We hope you are
          happy with your purchase. If you have any questions please contact us
        </p>
      </div>
      <div className="container text-muted fs-lg-1">
        {/* Footer */}
        <p>Only responses within 24 hrs are considerd</p>
        <div className="container-fluid text-*-right">
          <span className="text-right">11:01</span>
        </div>
      </div>
    </div>
  );
};

export default MyMessageTemplate;

import React from "react";
import { withNamespaces } from "react-i18next";

const Footer = ({ t }) => {
  return (
    <footer id="footer" className="bg-dark py-2">
      <p>
        {t("Meals developed by")}{" "}
        <a
          href="https://barryhoang.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          Barry Hoang
        </a>
      </p>
    </footer>
  );
};

export default withNamespaces()(Footer);

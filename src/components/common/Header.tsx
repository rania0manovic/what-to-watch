import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-row justify-start align-items-center header">
      <div className="logo">
        <a onClick={() => navigate("/")}>
          <img className="px-2" src="../../assets/logo_full.png"></img>
        </a>
      </div>
    </div>
  );
}

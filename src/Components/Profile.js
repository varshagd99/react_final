import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      
      <p>
        <strong>Token:</strong> {currentUser.auth_token.substring(0, 20)} ...{" "}
        {currentUser.auth_token.substr(currentUser.auth_token.length - 20)}
      </p>
      
    </div>
  );
};

export default Profile;
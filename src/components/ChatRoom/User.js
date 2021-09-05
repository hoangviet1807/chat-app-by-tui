import { Avatar, Button } from "@material-ui/core";
import React from "react";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../../context/authProvider";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

export default function User() {
  const {
    user: { displayName, photoURL },
  } = useContext(AuthContext);
  const history = useHistory();
  const handleSignOut = () => {
    auth.signOut();
    history.push("/login");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 16px",
        alignItems: "inherit",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar src={photoURL} />
        <span style={{ color: "white", marginLeft: "10px" }}>
          {displayName}
        </span>
      </div>
      <Button
        style={{
          color: "white",
          border: "1px solid white",
          textTransform: "none",
        }}
        color="secondary"
        variant="outlined"
        size="small"
        onClick={handleSignOut}
      >
        Đăng xuất
      </Button>
    </div>
  );
}

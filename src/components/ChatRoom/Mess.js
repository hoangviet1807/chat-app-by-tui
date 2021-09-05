import { Avatar } from "@material-ui/core";
import React from "react";
import { formatRelative } from "date-fns/esm";
import { auth } from "../../firebase/firebase";
import "./style.css";

function formatDate(seconds) {
  let formattedDate = "";

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

export default function Mess({ text, displayName, createAt, photoURL, uid }) {
  return (
    <div style={{ margin: "20px 0" }}>
      <div
        className={`msg ${uid === auth.currentUser.uid ? "sent" : "received"}`}
      >
        <Avatar size="small" src={photoURL} alt="" />
        <div>
          <div
            className={`msg ${
              uid === auth.currentUser.uid ? "sendText" : "receiverText"
            }`}
          >
            <span
              style={{
                marginLeft: 10,
                marginRight: 10,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {displayName}
            </span>
            <span style={{ fontSize: "12px" }}>
              {formatDate(createAt?.seconds)}
            </span>
          </div>
          <div
            className={`msg ${
              uid === auth.currentUser.uid ? "textSend" : "textReceived"
            }`}
          >
            <span>{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

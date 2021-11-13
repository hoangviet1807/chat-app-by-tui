import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, AvatarGroup } from "@material-ui/lab";
import { Tooltip } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Mess from "./Mess";
import { AppContext } from "../../context/appProvider";
import { AuthContext } from "../../context/authProvider";
import { addDocument } from "../../firebase/services";
import useFirestore from "../../hooks/useStoreFirebase";

export default function ChatWindow() {
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const messageListRef = useRef(null);
  const handleSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });
    setInputValue("");

    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  };
  const condition = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );
  const messages = useFirestore("messages", condition);

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <div>
      {selectedRoom.id ? (
        <>
          <div
            style={{
              height: "56px",
              display: "flex",
              justifyContent: "space-between",
              padding: " 0 16px",
              alignItems: "center",
              borderBottom: "2px solid beige",
            }}
          >
            <div>
              <p>{selectedRoom.nameRoom}</p>
            </div>
            <div style={{ display: "flex" }}>
              <Button
                style={{ textTransform: "none" }}
                startIcon={<PersonAddIcon />}
                size="small"
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Mời
              </Button>
              {members.map((member) => (
                <AvatarGroup max={1} size="small">
                  <Tooltip title={member.displayName}>
                    <Avatar src={member.photoURL} alt="" />
                  </Tooltip>
                </AvatarGroup>
              ))}
            </div>
          </div>
          {/* Body */}
          <div
            style={{
              height: "92vh",
              display: "flex",
              flexDirection: "column",
              padding: "11px",
              justifyContent: "flex-end",
            }}
          >
            <div
              ref={messageListRef}
              style={{ maxHeight: "100%", overflowY: "auto" }}
            >
              {messages.map((mess) => (
                <Mess
                  uid={mess.uid}
                  key={mess.uid}
                  text={mess.text}
                  photoURL={mess.photoURL}
                  displayName={mess.displayName}
                  createAt={mess.createAt}
                />
              ))}
            </div>

            {/* <div> {isTyping && ` is typing....`}</div> */}

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "2px 2px 2px 0",
                  border: "1px solid rgb(230, 230, 230)",
                  borderRadius: 2,
                }}
              >
                <TextField
                  value={inputValue}
                  placeholder="Soạn tin nhắn..."
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                  variant="outlined"
                  style={{ width: "93%" }}
                />
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  variant="outlined"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </div>
  );
}

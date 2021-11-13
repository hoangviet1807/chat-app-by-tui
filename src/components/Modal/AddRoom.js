import { Button, Modal, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { useState } from "react";
import { AppContext } from "../../context/appProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../context/authProvider";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "100vh",
  },
}));
export default function AddRoom() {
  const classes = useStyles();
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [nameRoom, setNameRoom] = useState("");

  const handleOk = () => {
    // handle logic
    // add new room to firestore
    addDocument("rooms", { nameRoom, members: [uid] });
    setNameRoom("");
    setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    // reset form value
    setNameRoom("");
    setIsAddRoomVisible(false);
  };
  return (
    <div>
      <Modal
        className={classes.modal}
        onClose={handleCancel}
        onSubmit={handleOk}
        open={isAddRoomVisible}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid black",
              justifyContent: "space-between",
            }}
          >
            <p style={{ paddingLeft: 10 }}>Tạo Phòng</p>
            <Button style={{ paddingRight: 10 }} startIcon={<ClearIcon />} />
          </div>
          <div style={{ height: "3vh" }} />
          <p>Tên phòng</p>
          <TextField
            style={{ width: "100vh" }}
            variant="outlined"
            placeholder="Nhap ten phong"
            onChange={(value) => setNameRoom(value.target.value)}
          />
          <div style={{ height: "5vh" }} />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleOk}
              style={{ marginRight: 10 }}
              size="small"
              variant="contained"
              color="primary"
            >
              Add Room
            </Button>
            <Button
              onClick={handleCancel}
              size="small"
              variant="contained"
              color="primary"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

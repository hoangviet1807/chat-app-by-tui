import {
  Button,
  Modal,
  TextField,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { AppContext } from "../../context/appProvider";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../../firebase/firebase";
import { Autocomplete } from "@material-ui/lab";

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

export default function InviteUser({}) {
  const classes = useStyles();
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);

  const ref = db.collection("users");
  const [schools, setSchools] = useState([]);
  const [select, setSelect] = useState([]);

  const [value, setValue] = useState("");

  //REALTIME GET FUNCTION
  function getSchools() {
    ref
      .where("keywords", "array-contains", value.toLowerCase()) // needs index
      .orderBy("displayName")
      .limit(20)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setSchools(items);
      });
  }

  useEffect(() => {
    getSchools();
  }, [value]);

  const handleOk = () => {
    // handle logic
    // add new room to firestore
    setValue("");

    const roomRef = db.collection("rooms").doc(selectedRoomId);

    roomRef.update({
      members: [
        ...selectedRoom.members,
        ...select.map((val) => val.uid),
        ...select.map((val) => val.photoURL),
      ],
    });
    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    setValue("");
    setIsInviteMemberVisible(false);
  };

  const handleChange = (e, value) => {
    // const data = value.map((val) => val.uid);
    setSelect(value);
  };

  console.log(select.map((val) => val.uid));
  return (
    <div>
      <Modal
        className={classes.modal}
        onClose={handleCancel}
        onSubmit={handleOk}
        open={isInviteMemberVisible}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <p>Mời thành viên</p>
          <Autocomplete
            multiple
            onChange={handleChange}
            onInputChange={(event, newInputValue) => {
              setTimeout(() => {
                setValue(newInputValue);
              }, 200);
            }}
            id="tags-standard"
            options={schools}
            getOptionLabel={(option) => option.displayName}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Nhập tên người dùng"
              />
            )}
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

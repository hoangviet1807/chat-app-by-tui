import React, { useContext, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import {  Button } from "@material-ui/core";
import { AppContext } from "../../context/appProvider";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./style.css";
import { useState } from "react";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../context/authProvider";
import { addDocument } from "../../firebase/services";

export default function RoomList() {
  const ref = db.collection("users");
  const {
    user: { uid },
  } = useContext(AuthContext);
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
    React.useContext(AppContext);
  const [value, setValue] = useState("");
  const [uidSelect, setUidSelect] = useState([]);
  const [options, setOption] = useState([]);
  const handeAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  useEffect(() => {
    getOptions();
  }, [value]);

  function getOptions() {
    ref
      .where("keywords", "array-contains", value.toLowerCase()) // needs index
      .orderBy("displayName")
      .limit(20)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setOption(items);
      });
  }

  const handleChange = (e, value) => {
    setUidSelect(value);
    addDocument("rooms", {
      ...options.map((val) => val.displayName),
      members: [uid, uidSelect.map((val) => val.uid)],
    });
    setSelectedRoomId();
    setValue("");
  };

  return (
    <div>
      <div style={{ height: 20 }} />
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment> */}

          {/* <Autocomplete
            freeSolo
            onChange={handleChange}
            onInputChange={(event, newInputValue) => {
              setTimeout(() => {
                setValue(newInputValue);
              }, 200);
            }}
            options={options}
            getOptionLabel={(option) => option.displayName}
            renderInput={(params) => (
              <TextField
                {...params}
                style={{ marginBottom: 20, width: "15em" }}
                fullWidth
                placeholder="Tìm kiếm..."
                className="inputRounded"
                variant="outlined"
                size="small"
              />
            )}
          /> */}

          <Button
            variant="outlined"
            onClick={handeAddRoom}
            startIcon={<AddCircleOutlineIcon />}
            style={{
              border: "1px solid rgba(255,255,255)",
              color: "white",
              textTransform: "none",
              marginBottom: 25,
            }}
          >
            Thêm phòng
          </Button>
        </div>
        {rooms.map((room) => (
          <div className="listRoom" onClick={() => setSelectedRoomId(room.id)}>
            <span style={{ marginLeft: 10 }}>{room.nameRoom}</span>
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

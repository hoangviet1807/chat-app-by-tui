import { Grid } from "@material-ui/core";
import React from "react";
import RoomList from "./RoomList";
import User from "./User";

export default function SideBar() {
  return (
    <div
      style={{
        borderRight: "2px solid beige",
        backgroundColor: "#0048AA",
        height: "100vh",
        color: "white",
      }}
    >
      <Grid>
        <Grid direction="column">
          <User />
        </Grid>
        <Grid direction="column">
          <RoomList />
        </Grid>
      </Grid>
    </div>
  );
}

import { Grid } from "@material-ui/core";
import React from "react";

import SideBar from "./SideBar";
import ChatWindow from "./ChatWindow";

export default function ChatRoom() {
  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={2}>
          <SideBar />
        </Grid>

        {/* phan chia grid */}

        <Grid container item xs={12} sm={10} direction="column">
          <ChatWindow />
        </Grid>
      </Grid>
    </div>
  );
}

import { Button } from "@material-ui/core";
import { Grid, TextField } from "@material-ui/core";
import React from "react";
import background from "../../assets/hinhnen.jpg";
import FacebookIcon from "@material-ui/icons/Facebook";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase/firebase";
import firebase from "firebase";
import { addDocument, generateKeywords } from "../../firebase/services";
export default function SignInSide() {
  const SignInWithGG = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName.toLowerCase()),
      });
    }
  };
  const SignInWittFB = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName.toLowerCase()),
      });
    }
  };

  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={6}>
          <img
            src={background}
            alt="img_login"
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: "10px" }}
        >
          <div />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 600,
              minWidth: 400,
            }}
          >
            <Grid container justify="center">
              <h1 style={{ color: "#b3daff" }}>Login Account</h1>
            </Grid>
            <TextField
              label="Username"
              margin="normal"
              style={{ color: "#b3daff" }}
            />
            <TextField label="Password" margin="normal" />
            <div style={{ height: 20 }} />
            <Button style={{ background: "#b3daff" }} variant="contained">
              Login
            </Button>
            <div style={{ height: 20 }} />
            <Button>You don't have account, Sign Up</Button>
            <div style={{ height: 20 }} />
            <Button
              startIcon={<FacebookIcon />}
              style={{ marginBottom: 10, background: "blue" }}
              color="primary"
              variant="contained"
              onClick={SignInWittFB}
            >
              Login with Facebook
            </Button>
            <Button
              startIcon={<FcGoogle />}
              style={{ background: "red" }}
              color="primary"
              variant="contained"
              onClick={SignInWithGG}
            >
              Login with Google
            </Button>
          </div>
          <div />
        </Grid>
      </Grid>
    </div>
  );
}

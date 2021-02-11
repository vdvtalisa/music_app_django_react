import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

function RoomJoinPage(props) {
    const [roomItems, setRoomItems] = useState({
      roomCode: "",
      error: "Fill in a code",
    })

    const history = useHistory();

    const handleTextFieldChange = e => {
        setRoomItems({
          ...roomItems,
          roomCode: e.target.value,
        })
        console.log(roomItems.roomCode)
    }

    const roomButtonPressed = () => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: roomItems.roomCode,
          }),
        };
        fetch("/api/join-room", requestOptions)
          .then((response) => {
            if (response.ok) {
              history.push(`/room/${roomItems.roomCode}`);
              console.log(roomItems.roomCode);
            } else {
              setRoomItems({ error: "Room not found." });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
        return (
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Join A Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField 
                    error={roomItems.error}
                    label="Code"
                    placeholder="Enter a room code"
                    value={roomItems.roomCode}
                    // helperText={this.state.error}
                    variant="outlined"
                    onChange={handleTextFieldChange}
                    ></TextField>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={roomButtonPressed}>Enter room</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" to="/" component={ Link }>Back</Button>
                </Grid>
            </Grid>
        );
};

export default RoomJoinPage;
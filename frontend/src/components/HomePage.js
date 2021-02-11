import React, { Component } from "react";
import RoomJoinPage from './RoomJoinPage copy';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // be default on first render, it will show us the homepage
            roomCode: null,
        }
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    // This will only be done once this component is loaded but async so it doesn't stop the rest of the program
    async componentDidMount() {
        fetch('/api/user-in-room').then((response) => response.json().then((data) => {
            this.setState({
                // this state will force our component to re-render
                roomCode: data.code
            })
        }))
    }

    clearRoomCode() {
        this.setState({
          roomCode: null,
        });
      }

    renderHomePage() {
        return(
            <Grid container spacing={3}>
            <Grid item xs={12} align="center">
              <Typography variant="h3" compact="h3">
                Chill Tunes
              </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <ButtonGroup disableElevation variant="contained" color="primary">
                <Button color="primary" to="/join" component={Link}>
                  Join a Room
                </Button>
                <Button color="secondary" to="/create" component={Link}>
                  Create a Room
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        );
    }

    render() {
        return <Router>
            <Switch>
                <Route exact path='/' render={() => {
                    return this.state.roomCode ? <Redirect to={`/room/${this.state.roomCode}`}/> : this.renderHomePage();
                }}>
                    </Route>
                <Route path='/join' component={RoomJoinPage} />
                <Route path='/create' component={CreateRoomPage} />
                {/* props given by route, return a room and callback, so child component can affect parent component => clear room code in home. Create new prop: leaveRoomCallBack*/}
                <Route path='/room/:roomCode' render={(props) => {
                    return <Room {...props} leaveRoomCallBack={this.clearRoomCode} />
                 }} />
            </Switch>
        </Router>;
    }
}
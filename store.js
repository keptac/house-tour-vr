import React from 'react';
import { asset, Environment } from 'react-360';
import house from './data/houseData';

const State = {
  room: '',
  roomName: '',
  info: '',
  adjacentRooms: [],
  mapDetails: ''
}

const listeners = new Set();

function updateComponents() {
  for (const cb of listeners.values()) {
    cb();
  }
}

export function changeRoom(roomSelection) {
  State.room = roomSelection;
  State.roomName = house[`${roomSelection}`].roomName;
  State.info = house[`${roomSelection}`].info;
  State.adjacentRooms = house[`${roomSelection}`].adjacentRooms;
  State.mapDetails = house[`${roomSelection}`].mapDetails;

  Environment.setBackgroundImage(asset(`./360_${house[`${roomSelection}`].img}`));

  updateComponents();
}

export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
      room: State.room,
      roomName: State.roomName,
      info: State.info,
      adjacentRooms: State.adjacentRooms,
      mapDetails: State.mapDetails
    };

    _listener = () => {
      this.setState({
        room: State.room,
        roomName: State.roomName,
        info: State.info,
        adjacentRooms: State.adjacentRooms,
        mapDetails: State.mapDetails
      });
    }

    componentWillMount() {
      if (this.state.room === '') {
        this.setState({
          room: house.House.roomName,
          roomName: house.House.roomName,
          info: house.House.info,
          adjacentRooms: house.House.adjacentRooms,
          mapDetails: house.House.mapDetails
        })
      }
    }

    componentDidMount() {
      listeners.add(this._listener);
    }

    render() {
      return (
        <Component
          {...this.props}
          room={this.state.room}
          roomName={this.state.roomName}
          info={this.state.info}
          adjacentRooms={this.state.adjacentRooms}
          mapDetails={this.state.mapDetails}
        />
      )
    }
  }
}

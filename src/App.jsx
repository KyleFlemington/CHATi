import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import uuid from 'node-uuid';

var ws = new WebSocket('ws://localhost:4000/');

class App extends Component {
	  constructor(props) {
    super(props);
    this.state =  {
      currentUser: {name: "Bob"},
      messages: []
    }
  }

  componentDidMount(){
    this.socket = new WebSocket ('ws://localhost:4000/');

    this.socket.onopen = (event) => {

      this.socket.onmessage = (event) => {
          
          console.log(event);
          var incoMessage = JSON.parse(event.data)

          var msgs = this.state.messages.concat(incoMessage)
          this.setState({messages: msgs})

      }
    }
  }

	sendMessageToServer(e) {
    const newID = uuid.v4()
    this.socket.send(JSON.stringify({
      type: 'postMessage',
      msgID: newID, 
      username: this.state.currentUser.name, 
      content: e
    }));
	}

  updateUserName (username) { 
    let currentUser = { name: username };
    let messages = this.state.messages
    this.setState({currentUser});

    this.socket.send(JSON.stringify({
      type: "postNotification",
      content: ` ${this.state.currentUser.name} has changed their name to ${username} `
    }));
  //   if (username !== currentUser){
  //   }
  //   this.socket.send(JSON.stringify({
  //     type: 'postNotification',
  //     upID: (),
  //     content: currentUser
  //   }));
  // }

  }

  render() {
    return (
    	<div>
    			
    			<nav>
      			<h1>CHATi</h1>
      		</nav>
      			
      			<MessageList 
            msgdata={this.state.messages}
            />
      	
      		<ChatBar 
      		usrName={this.state.currentUser}
      		onMessageSent={this.sendMessageToServer.bind(this)}
          updateUserName={this.updateUserName.bind(this)}
      		/>

      </div>
    );
  }
}
export default App;
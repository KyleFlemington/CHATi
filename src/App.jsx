import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import uuid from 'node-uuid';

var ws = new WebSocket('ws://localhost:4000/');
var data = {
      currentUser: {name: "Bob"},
      messages: []
};


class App extends Component {
	  constructor(props) {
    super(props);
    this.state = {data}
  }

  componentDidMount(){
    this.socket = new WebSocket ('ws://localhost:4000/');

    this.socket.onopen = (event) => {

      this.socket.onmessage = (event) => {
          
          var incoMessage = JSON.parse(event.data)
          var msgs = this.state.data.messages.push(incoMessage)
          this.setState({messages: msgs})

      }
    }
  }

	sendMessageToServer(e) {
    const newID = uuid.v4()
    this.socket.send(JSON.stringify({
      type: 'postMessage',
      msgID: newID, 
      username: this.state.data.currentUser.name, 
      content: e
    }));
	}

  updateUserName (username) { 
    let currentUser = { name: username };
    let messages = this.state.data.messages
    this.setState({data:{currentUser, messages}});


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
            msgdata={this.state.data.messages}
            />
      	
      		<ChatBar 
      		usrName={this.state.data.currentUser}
      		onMessageSent={this.sendMessageToServer.bind(this)}
          updateUserName={this.updateUserName.bind(this)}
      		/>

      </div>
    );
  }
}
export default App;
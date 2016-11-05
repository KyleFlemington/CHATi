import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import uuid from 'node-uuid';


class App extends Component {
	  constructor(props) {
    super(props);
    this.state =  {
      currentUser: {name: "Bob"},
      messages: [],
      totalUsers: 0
    }
  }

  componentDidMount(){
    this.socket = new WebSocket ('ws://localhost:4000/');

    this.socket.onopen = (event) => {

      this.socket.onmessage = (event) => {
       
        var incoMessage = JSON.parse(event.data)

        switch(incoMessage.type) {
        case 'userCount' :
          this.setState({totalUsers: incoMessage.usersOnline.usersOnline})


        break
        case 'postMessage' :
          var msgs = this.state.messages.concat(incoMessage)
          this.setState({messages: msgs})
        }
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
};

  render() {
    return (
    	<div>
    			
    			<nav>
      			<h1>CHATi</h1>


            <h4 id="user-count">{this.state.totalUsers} users online

            </h4>

                          
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
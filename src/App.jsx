import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

var ws = new WebSocket('ws://localhost:4000/');


var data = {
	currentUser: {name: "Bob"},
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
      msgID: 1,
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      msgID: 2,
    }
  ]
};


class App extends Component {
	  constructor(props) {
    super(props);
    this.state = {data};

  }

  componentDidMount(){
    this.socket = new WebSocket ('ws://localhost:4000/');

    this.socket.onopen = function (event) {
      console.log("YOFACE Has been Connected")
    }

   

  };

	handleUserMessage(e) {
		const newID = (data.messages.length + 1)
		console.log(this.state.data.currentUser)
		const done = data.messages.push({msgID: newID, username: this.state.data.currentUser.name, content: e});
		this.setState({messages: data.messages})

	}


  render() {
    return (
    	<div>
    			
    			<nav>
      			<h1>CHATi</h1>
      		</nav>
      			
      			<MessageList msgdata={this.state.data.messages}/>
      	

      		<ChatBar 
      		usrName={this.state.data.currentUser}
      		handleUserMessage={this.handleUserMessage.bind(this)}
      		/>

      </div>
    );
  }
}
export default App;
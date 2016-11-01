import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

var data = {
	currentUser: {name: "Bob"},
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
      msgID: "1",
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      msgID: "2",
    }
  ]
};


class App extends Component {

	  constructor(props) {
    super(props);
    this.state = {data};
  }

  render() {
  	console.log("Rendering <App/>")
    return (
    	<div>
    			<nav>
      			<h1>CHATi</h1>
      		</nav>
      			<MessageList msgdata={this.state.data.messages}/>
      	<footer>
      		<ChatBar usrName={this.state.data.currentUser}/>
      		<Message />
      	</footer>

      </div>
    );
  }
}
export default App;




import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
	render() {
		console.log("Rendering <MessageList/>")
		return (
			<div id="message-list">
			{this.props.msgdata.map(function(message){
				return <Message username={message.username} content={message.content} key={message.msgID} />
			})}
			</div>	
		);
	}		
}
export default MessageList;
 
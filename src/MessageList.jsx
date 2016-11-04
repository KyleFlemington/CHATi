import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
	render() {
		return (
			<div id="message-list">

			{this.props.msgdata.map(function(message){
				switch(message.type) {
					case 'postMessage':
						return <Message 
						username={message.username} 
						content={message.content} 
						key={message.msgID} 
						/>
					case 'postNotification':
						return <div class="message system" key={message.id}>{message.content}</div>
					}
				})
			}
			</div>
		);
	}		
}


export default MessageList;
 
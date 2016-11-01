import React, {Component} from 'react';

class ChatBar extends Component {
	render() {
		console.log("Rendering <ChatBar/>")
		return (
			<footer>
				<span className="displayName">
					<input id="username" type="text" placeholder={this.props.usrName.name}/>
				</span>
				<span>
					<input id="new-message" type="text" placeholder="Type a message and hit ENTER"/>
				</span>
			</footer>
		);
	}
}
export default ChatBar;
import React, {Component} from 'react';

class ChatBar extends Component {
	constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);

    this.handleUserEnter = this.handleUserEnter.bind(this);
  }

  handleChange(event) {
    this.setState({value:event.target.value});
  }

  handleUserEnter(e) {
  	e.preventDefault()
  		this.props.handleUserMessage(e.target.submitbutton.value);
  }

	render() {
		return (
			<footer>
						<span className="displayName">
					<input id="username" type="text" defaultValue={this.props.usrName.name}/>
				</span>
				<span className="textField">
					<form onSubmit={this.handleUserEnter}>
						<input name="submitbutton" id="new-message" 
						 type="text" 
						 placeholder="Type a message and hit ENTER"
						 onChange={this.handleChange}
						 value={this.state.value}
						 />
						</form>
				</span>
			</footer>
		);
	}
}
export default ChatBar;
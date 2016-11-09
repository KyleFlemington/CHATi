import React, {Component} from 'react';



class ChatBar extends Component {
	constructor(props) {
    super(props);
    this.state = {message: '', name: 'Bob' };
    this.handleChange = this.handleChange.bind(this);
    this.handleUserEnter = this.handleUserEnter.bind(this);
    this.userNameChange = this.userNameChange.bind(this);
    this.handleUserName = this.handleUserName.bind(this);

  }

  handleChange(event) {
    this.setState({message:event.target.value});
  }

  handleUserEnter(e) {
  	e.preventDefault()
  		this.props.onMessageSent(e.target.submitbutton.value);
  	var fresh = document.getElementById("new-message")
  	fresh.reset();
  }


  userNameChange(e) {
  	e.preventDefault();
  	 		console.log(e)
  		this.props.updateUserName(e.target.username.value);
  	
	}
  	handleUserName(e) {
  		this.setState({name:event.target.value});

  	}
  

	render() {
		return (
			<footer>

				<span className="displayName">
					<form onSubmit={this.userNameChange}>
						<input 	
							id="username"
							name="username" 
							type="text" 
							onChange={this.handleUserName}
							// value={this.state.name}
							placeholder={this.state.name}
						/>
					</form>
				</span>
				
				<span className="textField">
					<form onSubmit={this.handleUserEnter}>
						<input 
						name="submitbutton" 
							id="new-message" 
						 	type="text" 
						 	placeholder="Type a message and hit ENTER"
						 	onChange={this.handleChange}
						 	value={this.state.message}
						/>
					</form>
				</span>

			</footer>
		);
	}
}
export default ChatBar;
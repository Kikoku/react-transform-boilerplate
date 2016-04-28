import React, {Component} from 'react';

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.user != '') {
      this.props.onSubmit(this.state.user);
    } else {
      this.setState({
        error: 'Name Required'
      })
    }
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          name="user"
          type="text"
          placeholder="name"
          value={this.state.user}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          value="login"
        />
        <small>
          {this.state.error}
        </small>
      </form>
    )
  }
}

export default UserLogin;

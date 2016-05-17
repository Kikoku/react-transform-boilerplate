import React, {Component} from 'react';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(!this.props.user) {
      this.setState({
        error: 'Please Login'
      })
    } else if(this.state.msg == '') {
      this.setState({
        error: 'Cannot be null'
      })
    } else {
      this.props.onSubmit({
        user: this.props.user,
        msg: this.state.msg
      })
      this.setState({
        msg: ''
      })
    }
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          name="msg"
          type="text"
          placeholder="message"
          value={this.state.msg}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          value="post"
        />
        <small>
          {this.state.error}
        </small>
      </form>
    )
  }
}

export default CommentForm;

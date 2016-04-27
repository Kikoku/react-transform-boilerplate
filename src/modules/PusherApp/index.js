import React , {Component} from 'react';
import Pusher from 'pusher-js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as pusherActions from '../../actions/pusherActions';

class PusherApp extends Component {
  constructor() {
    super();
    this.state = {
      user: false,
      messages: [{
        user: 'Server',
        msg: 'Welcome to real time comments'
      }]
    }
    this.userSubmit = this.userSubmit.bind(this);
    this.commentSubmit = this.commentSubmit.bind(this);
  }

  componentWillMount() {
    this.pusher = new Pusher('a72b893e775eb14e8b4c');
    this.channel = this.pusher.subscribe('messanger_channel');
  }

  componentDidMount() {

    this.channel.bind('post_message', (data) => {
      this.setState({
        messages: [
          ...this.state.messages,
          data
        ]
      });
    });
  }

  userSubmit(name) {
    this.setState({
      user: name
    })
  }

  commentSubmit(message) {
    fetch('/message', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
  }

  render() {
    const {messages, user} = this.props.state;
    return (
      <div>
        {
          user
            ? user
            : <UserLogin
                onSubmit={this.userSubmit}
              />
        }
        <CommentForm user={user} onSubmit={this.commentSubmit}/>
        <CommentList messages={messages} />
      </div>
    )
  }
}

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
      console.log(this.state.msg)
      this.props.onSubmit({
        user: this.props.user,
        msg: this.state.msg
      })
      console.log('thist')
      this.setState({
        msg: ''
      })
      console.log(this.state)
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

const CommentList = ({messages}) => (
  <ul>
    {
      messages.map((message, i) => (
        <Comment user={message.user} msg={message.msg}/>
      ))
    }
  </ul>
)

const Comment = ({user, msg}) => (
  <li>
    <p><strong>{user}</strong> &mdash; {msg}</p>
  </li>
)

const Button = ({text, onClick}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

export default connect(state => ({
  state: state.pusher
}),
(dispatch) => ({
  actions: bindActionCreators(pusherActions, dispatch)
}))(PusherApp);

import React , {Component} from 'react';
import Pusher from 'pusher-js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as pusherActions from '../../actions/pusherActions';
import CommentList from '../CommentList';
import CommentForm from '../CommentForm';
import UserLogin from '../UserLogin';

class PusherApp extends Component {

  componentWillMount() {
    this.pusher = new Pusher('a72b893e775eb14e8b4c');
    this.channel = this.pusher.subscribe('messanger_channel');
  }

  componentDidMount() {
    this.channel.bind('post_message', (data) => {
      this.props.actions.messageSubmit(data);
    });
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
    const {userSubmit} = this.props.actions;

    return (
      <div>
        { user ? user : <UserLogin onSubmit={userSubmit} /> }
        <CommentForm user={user} onSubmit={this.commentSubmit}/>
        <CommentList messages={messages} />
      </div>
    )
  }
}

export default connect(state => ({
  state: state.pusher
}),
(dispatch) => ({
  actions: bindActionCreators(pusherActions, dispatch)
}))(PusherApp);

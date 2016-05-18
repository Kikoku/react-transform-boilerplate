import path from 'path';
import express from 'express';
import webpack from 'webpack';
import config from './webpack.config.dev';
import bodyParser from 'body-parser';
import pusher from './pusher';
import facbook_config from './facbook.config';
import Querystring from 'querystring';
import axios from 'axios';

const me_endpoint_base_url = `https://graph.accountkit.com/${facbook_config.account_kit.version}/me`;
const token_exchange_base_url = `https://graph.accountkit.com/${facbook_config.account_kit.version}/access_token`;

let notifications = [
  {message: 'db notif'}
];

const port = process.env.PORT || 3000;

const app = express();
const compiler = webpack(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.get('/notifications', (req, res) => {
  console.log('get /notifications');
  res.send(notifications);
})

app.post('/notifications', (req, res) => {
  console.log('post /notifications');
  pusher.trigger('value_channel','my_event', {
    message: 'push test'
  })
  res.end()
})

app.post('/values', (req, res) => {
  console.log('post /values');
  pusher.trigger('value_channel', 'value_update', {
    value: req.body.value
  })
  res.end()
})

app.post('/message', (req, res) => {
  console.log('post /message');
  pusher.trigger('messanger_channel', 'post_message', {
    user: req.body.user,
    msg: req.body.msg
  });
  res.end()
})


app.post('/sendcode', (req, res) => {

  const app_access_token = ['AA', facbook_config.facebook.id, facbook_config.account_kit.secret].join('|');
  const params = {
    grant_type: 'authorization_code',
    code: req.body.code,
    access_token: app_access_token
  }

  const token_exchange_url = `${token_exchange_base_url}?grant_type=${params.grant_type}&code=${params.code}&access_token=${params.access_token}`;
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});

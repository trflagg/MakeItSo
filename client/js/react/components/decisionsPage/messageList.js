import React from 'react';
import _ from 'underscore';

import Message from './message';

class MessageList extends React.Component {

  buildMessageList(messages) {
    // has children with messages?
    if (messages.has('childMessageCount')) {
      if( messages.get('childMessageCount') > 0) {
        return messages.get('children').map(child => (this.buildMessageList(child)));
      }
    } else {
      if (messages.models) {
        // these come from the root commands accessed by ship.get('children')
        return messages.models.map(message => {
          console.dir(message);
          console.log(message.full_path());
          return (<Message message={message} key={message.get('text')}/>);
        });
      } else if (messages.has('text')) {
        // ugh, I know it's messages and not message.
        // these come from the commandHolders
        console.dir(messages);
        console.log(messages.full_path());
        return (<Message message={messages} key={messages.get('text')}/>);
      }
    }
  }

  render() {
    const messages = this.props.messages;

    return (
      <ul className="messages-list">
        {_.flatten(this.buildMessageList(messages))}
      </ul>
    );
  }
}

export default MessageList;


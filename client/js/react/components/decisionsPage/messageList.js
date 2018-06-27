import React from 'react';
import _ from 'lodash';

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
          return this.buildMessage(message);
        });
      } else if (messages.has('text')) {
        // ugh, I know it's messages and not message.
        // these come from the commandHolders
        return this.buildMessage(messages);
      }
    }
  }

  buildMessage(message) {
    return <Message
      message={message}
      key={message.get('text')}
      onClick={this.props.onMessageClicked}
    />
  }

  render() {
    const messages = this.props.messages;

    return (
      <ul
        className="messages-list">
        {_.flatten(this.buildMessageList(messages))}
      </ul>
    );
  }
}

export default MessageList;


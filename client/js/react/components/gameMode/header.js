import React from 'react';

import './header.scss';

export default class Header extends React.Component {

  render() {
    const {profile,
          ship,
          dm_button,
          viewingDMs,
          newDMs,
          onDMToggle,
          redAlert,
    } = this.props;

    return (
      <div className={redAlert ? "red-alert" : ""}>
        <div id="header">
          <div id="subheader">
            <h1>Cpt. {profile.get('name')} of the {ship.get('shipName')}</h1>
            <h2>{ ship.location || "Andromedae/Cygni Warp Transfer"}</h2><br/>
            <h2>{ ship.chapter || "Prologue" }</h2>
          </div>
          <div className="controls">
            { dm_button &&
              <p
                className={newDMs && !viewingDMs ? 'commandItem new' : 'commandItem'}
                id="dm_button"
                onClick={onDMToggle}
              >
              { !viewingDMs ? 'Messages' : 'Back' }
              </p>
            }
          </div>
        </div>
      </div>
    );
  }
}

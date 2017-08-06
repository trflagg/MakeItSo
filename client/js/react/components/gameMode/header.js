import React from 'react';

import './header.scss';

export default class Header extends React.Component {

  render() {
    const {profile,
          ship,
          dm_button,
          showDMScreen,
          onDMToggle,
    } = this.props;

    return (
      <div>
        <div id="header">
          <div id="subheader">
            <h1>Cpt. {profile.name} of the {ship.get('shipName')}</h1>
            <h2>{ ship.location || "Andromedae/Cygni Warp Transfer"}</h2><br/>
            <h2>{ ship.chapter || "Prologue" }</h2>
          </div>
          <div className="controls">
            { dm_button &&
              <p
                className="commandItem"
                id="dm_button"
                onClick={onDMToggle}
              >
              { !showDMScreen ? 'Direct Messages' : 'Back' }
              </p>
            }
          </div>
        </div>
      </div>
    );
  }
}

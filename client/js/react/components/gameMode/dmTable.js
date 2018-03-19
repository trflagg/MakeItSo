import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'

import './dmTable.scss';

const DMTable = ({ dms, onRowClick }) => (
  <div id="dmTable">
    <h2>Direct Messages</h2>
    <div>
      <table>
        <tbody>
          { dms.get('children').map((dm) => (
            <tr
              className={dm.get('unread') ? 'unread' : ''}
              key={dm.get('text')}
              onClick={() => { onRowClick(dm); } }
            >
              <td>
                {dm.get('unread') &&
                  <FontAwesomeIcon icon={faEnvelope} />
                }
              </td>

              <td>
                {dm.get('text')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DMTable;

import React from 'react';

import './dmTable.scss';

const DMTable = ({ dms, onRowClick }) => (
  <div id="dmTable">
    <h2>Direct Messages</h2>
    <div>
      <table>
        <tbody>
          { dms.get('children').map((dm) => (
            <tr
              key={dm.get('text')}
              onClick={() => { onRowClick(dm); } }
            >
              <td>
                {dm.get('unread') &&
                  '!'
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

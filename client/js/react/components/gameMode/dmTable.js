import React from 'react';

const DMTable = ({ dms, onRowClick }) => (
  <table>
    <thead>
      <tr>
        <td>Subject</td>
        <td>Read?</td>
      </tr>
    </thead>
    <tbody>
      { dms.get('children').map((dm) => (
        <tr
          key={dm.get('text')}
          onClick={() => { onRowClick(dm); } }
        >
          <td>
            {dm.get('text')}
          </td>
          <td>
            {dm.get('unread') &&
              'unread'
            }
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DMTable;

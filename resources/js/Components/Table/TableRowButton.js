import React from 'react';
import Link from '@/Components/Link/Link';
import TableRow from './TableRow';
import styles from './TableRowButton.module.scss';

function TableRowButton(props) {
  return (
    <Link
      className={styles.row}
      component={TableRow}
      {...props}
    />
  );
}

export default TableRowButton;

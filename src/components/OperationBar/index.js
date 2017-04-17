import React from 'react'
import styles from './index.less'

const OperationBar = ({ children }) => {
  return (
    <div className={styles.tableHeader}>
      {children}
    </div>
  )
}

export default OperationBar
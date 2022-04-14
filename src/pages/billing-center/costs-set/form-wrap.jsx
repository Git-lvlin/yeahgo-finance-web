import React from 'react'

const FromWrap = ({ value, onChange, content, right }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div>{content(value, onChange)}</div>
    <div style={{ flex: 1, marginLeft: 10, minWidth: 180, fontSize: 14 }}>{right(value)}</div>
  </div>
)

export default FromWrap
import React from 'react'

const Test = () => {

  const [count, setCount] = React.useState(0)
  const [count2, setCount2] = React.useState(0)
  const [update, setUpdate] = React.useState(0)

  const Count = (({ count }) => {
    return <>
      <div>{count}</div>
      {/* <div>{count2}</div> */}
      <button onClick={addCount}>Add Count</button>
      <button onClick={addCount2}>Add Count2</button>
      <button onClick={toggle}>Toggle</button>
    </>
  })

  React.memo(Count, (prev, next) => {
    if (prev.count === next.count)
      return false
  })

  const toggle = () => {
    setUpdate(prev => prev + 1)
  }

  const Count2 = React.useCallback(() => <div>{count2}</div>, [count2])

  const addCount = () => {
    setCount(prev => prev + 1)
  }

  const addCount2 = () => {
    setCount2(prev => prev + 1)
  }

  return (
    <div>
      <Count count={count} />
      <div><Count2 /></div>
      <div>{update}</div>
      {/* <button onClick={addCount}>Add Count</button>
      <button onClick={addCount2}>Add Count2</button>
      <button onClick={toggle}>Toggle</button> */}
    </div>
  )
}

export default Test
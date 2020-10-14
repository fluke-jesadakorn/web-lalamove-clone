import React from 'react'

const Test = () => {

  const [test, setTest] = React.useState(0)
  const [test2, setTest2] = React.useState(0)
  const [test3, setTest3] = React.useState(0)

  const [cb, setCb] = React.useState(0)
  const [cb2, setCb2] = React.useState(0)
  const [cb3, setCb3] = React.useState(0)

  const ProtectRender = React.memo(({ test, test2, test3 }) => <div>{test}{test2}{test3}</div>)
  const Callback = React.useCallback(({ cb, cb2, cb3 }) => <><div>{cb}</div><div>{cb2}</div><div>{cb3}</div></>, [cb])
  const Modal = React.memo(
    cb => { return <div>Test</div> },
    () => true
  )

  return (
    <div>
      <div><button onClick={() => setCb(prev => prev + 1)}>add</button></div>
      <div><button onClick={() => setCb2(prev => prev + 1)}>add2</button></div>
      <div><button onClick={() => setCb3(prev => prev + 1)}>add3</button></div>
      {/* <div>{test}</div>
      <div><ProtectRender test2={test2} /></div> */}

      cb{cb}

      <Callback cb={cb} cb2={cb2} cb3={cb3} />
      <Modal cb={cb} />
    </div>
  )
}

export default Test

import React, { useEffect } from 'react'
import Status from './Status'
import Preview from './Preview';


function Home(props) {
  console.log('render Home,', props);

  return (
    <div className="home">
      <Status />
      <Preview />
    </div>
  )
}

export default Home

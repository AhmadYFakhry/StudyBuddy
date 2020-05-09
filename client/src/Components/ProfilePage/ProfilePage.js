import React, { useState, useEffect } from 'react';

export default function ProfilePage(props) {

  const [profileId] = useState(props.match.params.id);

  // console.log(profileId)
  useEffect(() => {
    
  }, [])

  //TODO: Get user data at apply it to the graphs

  //GRAPH 1: Amount of tasks done
  //GRAPH 2: Total Time studied

  //GRAPH 2: Efficiency - Total Tasks done/Total time studies

  return(
    <div>
      <h1>Profile</h1>
    </div>
  ) 
}
import React from 'react'

import { useParams } from 'react-router-dom';
import {  isReference, useQuery} from '@apollo/client';
import UpdateStory from './updateStory';
import { QUERY_ME} from '../utils/queries';
import { QUERY_STORY} from '../utils/queries';
import DeleteStory from './deleteStory';

const styles = {
  card: {
    margin: 20,
    background: '#9DC0CB',
  },
  title: {
    background: '#2E9CC2',
    minHeight: 50,
    lineHeight: 3.5,
    fontSize: '1.8rem',
    textAlign: "center",
    color: 'black',
    padding: '0 20px',
  },
  description: {
    padding: 20,
  },
};

export default function MyStory() {

    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || [];
    
  

  if(loading){
    return <h2>Loading...</h2>
  }
    return (
<div className='p-5'>
 
      <div className='container'>
        <h2>View My stories!</h2>
      
      <h4>
        {userData.stories?.length
          ? `Viewing ${userData.stories.length} saved ${userData.stories.length === 1 ? 'story' : 'stories'}:`
          : 'You have no stories!'}
      </h4>
      </div>
      {userData.stories?.map((story) => {
        return (
          <div className='row justify-content-around'>
            <div className='col-7'>
      <div key={story._id} className="card shadow-lg" style = {styles.card}>
            <h3 className="card-title" style = {styles.title}>{story.title}</h3>
          <div class="card-body">
              <img src={story.image} className="card-img-top" alt="ripples-of-hope" width="100%" height="500"></img>
          
            <p className="card-text" style = {styles.description}>{story.description}</p>

           <UpdateStory story={story}/>  
            <DeleteStory storyId={story._id}/>
           </div> 
          </div>
          </div>
      </div>)}


    )
}
</div>
   ) }
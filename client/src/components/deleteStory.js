import { useNavigate } from 'react-router-dom';
import { DELETE_STORY } from '../utils/mutations';
import { QUERY_STORIES } from '../utils/queries';

import { useMutation } from '@apollo/client';

export default function DeleteStory({ storyId }) {
  // const navigate = useNavigate();
  const [deleteStory, { error }] = useMutation(DELETE_STORY);
  // const [deleteStory] = useMutation(DELETE_STORY, {
  //   variables: { id: storyId },
  //   onCompleted: () => navigate('/stories'),
  //   refetchQueries: [{ query: QUERY_STORIES }],
  // });
const handleClick = async (e) =>{
try{
const {data} = await deleteStory({variables:{id:e.target.id}});
}catch(err){
  console.log(err);
}
window.location.replace('/addStory');
}
  return (
    <div className='d-flex mt-2 ms-auto justify-content-center'>
      <button id={storyId} className='btn btn-danger m-2' onClick={handleClick}>
       Delete Story
      </button>
    </div>
  );
}

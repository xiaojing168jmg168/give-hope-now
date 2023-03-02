import { useState } from "react";
import { useMutation } from "@apollo/client";
import { QUERY_STORY } from '../utils/queries';
import { UPDATE_STORY } from "../utils/mutations";

export default function UpdateStory({ story }) {
  const [title, setTitle] = useState(story.title);
  const [description, setDescription] = useState(story.description);
  const [image, setImage] = useState(story.image)

  // const [updateStory] = useMutation(UPDATE_STORY, {
  //   variables: { id: story.id, title, description, image },
  //   refetchQueries: [{ query: QUERY_STORY, variables: { id: story.id } }],
  // });
  const [updateStory, { error }] = useMutation(UPDATE_STORY);
  const onSubmit = async (e) => {
    e.preventDefault();
console.log(e.target.id,title, description, image)
  
    try {
      const { data } = await updateStory({
        variables: { id: e.target.id, title:title, description:description, image:image }
      });
      console.log(data);
    } catch (err) {
      console.error(err)
    }
    // window.location.replace('/addStory');
  }
  

  return (
    <div className="mt-5">
      <h3>Edit This Story</h3>
      <form id={story._id} onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

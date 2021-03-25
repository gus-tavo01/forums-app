import React from 'react';

function ForumDetails(props) {
  return (
    <div>
      <div>
        <div>image</div>
        {props.name}
        <div>options</div>
      </div>
      <div>
        <div>author name</div>
        <div>date</div>
      </div>
      <div>Forum description</div>
      <div>topics</div>
      <div>
        <div>participants</div>
        list of participants
      </div>
    </div>
  );
}

export default ForumDetails;

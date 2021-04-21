import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ForumCard from './ForumCard';

function ForumsList(props) {
  return (
    <Fragment>
      {props.forums.map((forum, i) => (
        <ForumCard
          id={forum.id}
          key={i}
          name={forum.name}
          participants={forum.participants.length}
          lastActivity={forum.lastActivity}
          image={forum.imageSrc}
          author={forum.author}
          description={forum.description}
        />
      ))}
    </Fragment>
  );
}

export default ForumsList;

ForumsList.propTypes = {
  forums: PropTypes.array,
};

ForumsList.defaultProps = {
  forums: [],
};

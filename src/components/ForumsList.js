import React from 'react';
import PropTypes from 'prop-types';
import ForumCard from './ForumCard';

function ForumsList(props) {
  const { forums } = props;
  return (
    <>
      {forums.map((forum) => (
        <ForumCard
          id={forum.id}
          key={forum.id}
          topic={forum.topic}
          participants={forum.participants}
          lastActivity={forum.lastActivity}
          image={forum.imageSrc}
          author={forum.author}
          description={forum.description}
        />
      ))}
    </>
  );
}

export default ForumsList;

ForumsList.propTypes = {
  forums: PropTypes.arrayOf(
    PropTypes.shape({
      topic: PropTypes.string,
      author: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      lastActivity: PropTypes.string,
      participants: PropTypes.number,
    }),
  ),
};

ForumsList.defaultProps = {
  forums: [],
};

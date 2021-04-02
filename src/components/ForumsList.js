import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ForumCard from './ForumCard';

function ForumsList(props) {
  return (
    <Fragment>
      {props.forums.map((forum) => (
        <ForumCard
          id={forum.id}
          key={forum.id}
          name={forum.title}
          participants={forum.participants}
          lastPostDate={forum.lastPostDate}
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

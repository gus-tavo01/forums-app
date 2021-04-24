import React from 'react';
import PropTypes from 'prop-types';
import TopicCard from './TopicCard';

function TopicsList(props) {
  const { items } = props;

  if (!items.length) return 'This forum does not have any topic yet 🥱...';

  return (
    <>
      {items.map((topic) => (
        <TopicCard name={topic.name} lastActivity={topic.lastActivity} comments={topic.comments} />
      ))}
    </>
  );
}

TopicsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastActivity: PropTypes.string.isRequired,
      comments: PropTypes.number.isRequired,
    }),
  ),
};

TopicsList.defaultProps = {
  items: [],
};

export default TopicsList;

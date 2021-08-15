import React from 'react';
import PropTypes from 'prop-types';
import TopicCard from './TopicCard';

function TopicsList(props) {
  const { items } = props;

  if (!items.length) return 'This forum does not have any topic yet 😕...';

  return (
    <>
      {items.map((topic) => (
        <TopicCard
          key={topic.id}
          id={topic.id}
          name={topic.name}
          lastActivity={topic.updateDate || topic.createDate}
          comments={topic.comments.length}
        />
      ))}
    </>
  );
}

TopicsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      createDate: PropTypes.string.isRequired,
      comments: PropTypes.number.isRequired,
      updateDate: PropTypes.string,
    }),
  ),
};

TopicsList.defaultProps = {
  items: [],
};

export default TopicsList;

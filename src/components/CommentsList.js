import React from 'react';
import PropTypes from 'prop-types';
// components
import CommentCard from './CommentCard';

function CommentsList(props) {
  const { items } = props;
  return (
    <>
      {items.map((item) => (
        <CommentCard
          key={item.id}
          from={item.from}
          to={item.to}
          message={item.message}
          date={item.createDate}
          likes={item.likes}
          dislikes={item.dislikes}
        />
      ))}
    </>
  );
}

CommentsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }),
  ),
};

CommentsList.defaultProps = {
  items: [],
};

export default CommentsList;

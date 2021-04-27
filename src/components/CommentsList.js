import React from 'react';
import PropTypes from 'prop-types';

function CommentsList(props) {
  const { items } = props;

  if (!items.length) return <div>No comments yet 💬</div>;
  return items.map((item) => <div>{item.message}</div>);
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

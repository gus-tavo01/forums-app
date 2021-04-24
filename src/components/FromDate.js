import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function FromDate(props) {
  const { children } = props;
  return <span>{dayjs(children).fromNow()}</span>;
}

FromDate.propTypes = {
  children: PropTypes.string.isRequired,
};

export default FromDate;

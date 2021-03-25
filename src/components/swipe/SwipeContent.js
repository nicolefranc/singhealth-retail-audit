import React from 'react';
import PropTypes from 'prop-types';

const SwipeContent = ({ label, position }) => (
    <div className={`swipeable-listitem-${position}`}>
        <span>{label}</span>
    </div>
);

SwipeContent.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  position: PropTypes.oneOf(['left', 'right']).isRequired
};

export default SwipeContent;
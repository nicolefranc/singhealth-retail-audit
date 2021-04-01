import React from 'react';
import PropTypes from 'prop-types';

const SwipeContent = ({ icon, label, position }) => (
    <div className={`swipeable-listitem-${label}`}>
      <div className="swipeable-listitem-content">
        <span className="swipeable-listitem-icon">{icon}</span>
        {label && <span>{label}</span>}
      </div>
    </div>
);

SwipeContent.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  position: PropTypes.oneOf(['left', 'right']).isRequired
};

export default SwipeContent;
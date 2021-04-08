import React from 'react';
import PropTypes from 'prop-types';

//  padding: 4px 8px

export const SwipeContentAction1 = ({ icon, label}) => (
  <div className="bg-blue-500 text-white h-full w-full flex-1 flex flex-col justify-center items-end box-border">
    <div className="swipeable-listitem-content">
      <span className="swipeable-listitem-icon">{icon}</span>
      {label && <span>{label}</span>}
    </div>
  </div>
);

export const SwipeContentAction2 = ({ icon, label}) => (
<div className="bg-yellow-500 text-white h-full w-full flex-1 flex flex-col justify-center items-end box-border">
  <div className="swipeable-listitem-content">
    <span className="swipeable-listitem-icon">{icon}</span>
    {label && <span>{label}</span>}
  </div>
</div>
);

SwipeContentAction1.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string
};

SwipeContentAction2.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string
};

// export default {SwipeContentAction1,SwipeContentAction2};





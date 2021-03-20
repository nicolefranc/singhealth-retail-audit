import React from 'react';
import PropTypes from 'prop-types';

const SwipeListItem = ({ description, name }) => (
    <div className="complex-swipeable-list__item">
        <div className="complex-swipeable-list__item-label">
        <span className="complex-swipeable-list__item-name">{name}</span>
        </div>
        {description && (
        <div className="complex-swipeable-list__item-description">
            {description}
        </div>
        )}
    </div>
);

SwipeListItem.propTypes = {
    description: PropTypes.string,
    name: PropTypes.string
};

export default SwipeListItem;

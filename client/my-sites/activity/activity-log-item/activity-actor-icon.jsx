import { Gridicon } from '@automattic/components';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class ActivityActorIcon extends PureComponent {
	static propTypes = {
		icon: PropTypes.string.isRequired,
	};

	render() {
		const { icon } = this.props;

		return (
			<div className="activity-log-item__activity-actor">
				<Gridicon icon={ icon } size={ 18 } />
			</div>
		);
	}
}

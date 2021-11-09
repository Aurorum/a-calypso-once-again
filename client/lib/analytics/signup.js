import { resolveDeviceTypeByViewPort } from '@automattic/viewport';
import debug from 'debug';
import {
	adTrackSignupStart,
	adTrackSignupComplete,
	adTrackRegistration,
} from 'calypso/lib/analytics/ad-tracking';
import { recordFullStoryEvent } from 'calypso/lib/analytics/fullstory';
import { gaRecordEvent } from 'calypso/lib/analytics/ga';
import { identifyUser } from 'calypso/lib/analytics/identify-user';
import { addToQueue } from 'calypso/lib/analytics/queue';
import { recordTracksEvent } from 'calypso/lib/analytics/tracks';

const signupDebug = debug( 'calypso:analytics:signup' );

export function recordSignupStart( flow, ref ) {
	// Tracks
	recordTracksEvent( 'calypso_signup_start', { flow, ref } );
	// Google Analytics
	gaRecordEvent( 'Signup', 'calypso_signup_start' );
	// Marketing
	adTrackSignupStart( flow );
	// FullStory
	recordFullStoryEvent( 'calypso_signup_start', { flow, ref } );
}

export function recordSignupComplete(
	{ flow, siteId, isNewUser, hasCartItems, isNew7DUserSite, theme, intent, startingPoint },
	now
) {
	const isNewSite = !! siteId;

	if ( ! now ) {
		// Delay using the analytics localStorage queue.
		return addToQueue(
			'signup',
			'recordSignupComplete',
			{ flow, siteId, isNewUser, hasCartItems, isNew7DUserSite, theme, intent, startingPoint },
			true
		);
	}

	// Tracks
	// Note that Tracks expects blog_id to differntiate sites, hence using
	// blog_id instead of site_id here. We keep using "siteId" otherwise since
	// all the other fields still refer with "site". e.g. isNewSite
	recordTracksEvent( 'calypso_signup_complete', {
		flow,
		blog_id: siteId,
		is_new_user: isNewUser,
		is_new_site: isNewSite,
		has_cart_items: hasCartItems,
		theme,
		intent,
		starting_point: startingPoint,
	} );

	// Google Analytics
	const flags = [
		isNewUser && 'is_new_user',
		isNewSite && 'is_new_site',
		hasCartItems && 'has_cart_items',
	].filter( Boolean );

	// Google Analytics
	gaRecordEvent( 'Signup', 'calypso_signup_complete:' + flags.join( ',' ) );

	// Tracks, Google Analytics, FullStory
	if ( isNew7DUserSite ) {
		const device = resolveDeviceTypeByViewPort();

		// Tracks
		recordTracksEvent( 'calypso_new_user_site_creation', { flow, device } );
		// Google Analytics
		gaRecordEvent( 'Signup', 'calypso_new_user_site_creation' );
		// FullStory
		recordFullStoryEvent( 'calypso_new_user_site_creation', { flow, device } );
	}

	// Marketing
	adTrackSignupComplete( { isNewUserSite: isNewUser && isNewSite } );

	// FullStory
	recordFullStoryEvent( 'calypso_signup_complete', {
		flow,
		blog_id: siteId,
		is_new_user: isNewUser,
		is_new_site: isNewSite,
		has_cart_items: hasCartItems,
	} );
}

export function recordSignupStep( flow, step ) {
	const device = resolveDeviceTypeByViewPort();

	signupDebug( 'recordSignupStep:', { flow, step, device } );

	// Tracks
	recordTracksEvent( 'calypso_signup_step_start', { flow, step, device } );
	// FullStory
	recordFullStoryEvent( 'calypso_signup_step_start', { flow, step, device } );
}

export function recordSignupInvalidStep( flow, step ) {
	recordTracksEvent( 'calypso_signup_goto_invalid_step', { flow, step } );
}

/**
 * Records registration event.
 *
 * @param {object} param {}
 * @param {object} param.userData User data
 * @param {string} param.flow Registration flow
 * @param {string} param.type Registration type
 */
export function recordRegistration( { userData, flow, type } ) {
	const device = resolveDeviceTypeByViewPort();

	signupDebug( 'recordRegistration:', { userData, flow, type } );

	// Tracks user identification
	identifyUser( userData );
	// Tracks
	recordTracksEvent( 'calypso_user_registration_complete', { flow, type, device } );
	// Google Analytics
	gaRecordEvent( 'Signup', 'calypso_user_registration_complete' );
	// Marketing
	adTrackRegistration();
	// FullStory
	recordFullStoryEvent( 'calypso_user_registration_complete', { flow, type, device } );
}

/**
 * @format
 * @jest-environment jsdom
 */

/**
 * External dependencies
 */
import React from 'react';
import { shallow } from 'enzyme';
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import { JetpackHeader } from '..';

describe( 'JetpackHeader', () => {
	test( 'renders default Jetpack logo when no partnerSlug prop', () => {
		const wrapper = shallow( <JetpackHeader /> );
		expect( wrapper.children() ).toHaveLength( 1 );
		expect( wrapper.children().name() ).toEqual( 'JetpackLogo' );
		expect( wrapper.find( 'JetpackLogo' ).props().size ).toEqual( 45 );
	} );

	test( 'should render default Jetpack logo when passed empty string for partnerSlug prop', () => {
		const wrapper = shallow( <JetpackHeader partnerSlug="" /> );
		expect( wrapper.children() ).toHaveLength( 1 );
		expect( wrapper.children().name() ).toEqual( 'JetpackLogo' );
		expect( wrapper.find( 'JetpackLogo' ).props().size ).toEqual( 45 );
	} );

	test( 'should render JetpackLogo when passed an unknown partner slug', () => {
		const wrapper = shallow( <JetpackHeader partnerSlug="nonexistent" /> );
		expect( wrapper.children() ).toHaveLength( 1 );
		expect( wrapper.children().name() ).toEqual( 'JetpackLogo' );
		expect( wrapper.find( 'JetpackLogo' ).props().size ).toEqual( 45 );
	} );

	test( 'should render a co-branded logo when passed a known partner slug', () => {
		const wrapper = shallow( <JetpackHeader partnerSlug="dreamhost" translate={ noop } /> );
		expect( wrapper.find( 'JetpackDreamhostLogo' ) ).toHaveLength( 1 );
		expect( wrapper.find( 'JetpackLogo' ) ).toHaveLength( 1 );
		expect( wrapper.find( 'JetpackLogo' ).props().size ).toEqual( 150 );
		expect( wrapper.find( 't' ).props().icon ).toEqual( 'plus-small' );
	} );
} );

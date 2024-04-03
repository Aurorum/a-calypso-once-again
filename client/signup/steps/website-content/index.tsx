import page from '@automattic/calypso-router';
import { Button, ConfettiAnimation, Dialog } from '@automattic/components';
import styled from '@emotion/styled';
import debugFactory from 'debug';
import { useTranslate } from 'i18n-calypso';
import { useEffect, useState, ChangeEvent, useCallback } from 'react';
import errorIllustration from 'calypso/assets/images/customer-home/disconnected.svg';
import { LoadingEllipsis } from 'calypso/components/loading-ellipsis';
import AccordionForm from 'calypso/signup/accordion-form/accordion-form';
import {
	BBE_STORE_WEBSITE_CONTENT_FILLING_STEP,
	BBE_WEBSITE_CONTENT_FILLING_STEP,
	useTranslatedPageTitles,
} from 'calypso/signup/difm/translation-hooks';
import StepWrapper from 'calypso/signup/step-wrapper';
import { useSelector, useDispatch } from 'calypso/state';
import { errorNotice, successNotice } from 'calypso/state/notices/actions';
import { saveSignupStep } from 'calypso/state/signup/progress/actions';
import {
	changesSaved,
	initializeWebsiteContentForm,
	updateWebsiteContentCurrentIndex,
} from 'calypso/state/signup/steps/website-content/actions';
import { useGetWebsiteContentQuery } from 'calypso/state/signup/steps/website-content/hooks/use-get-website-content-query';
import { useSaveWebsiteContentMutation } from 'calypso/state/signup/steps/website-content/hooks/use-save-website-content-mutation';
import {
	getWebsiteContent,
	getWebsiteContentDataCollectionIndex,
	isMediaUploadInProgress,
	WebsiteContentStateModel,
	hasUnsavedChanges as hasUnsavedWebsiteContentChanges,
} from 'calypso/state/signup/steps/website-content/selectors';
import { getSiteId } from 'calypso/state/sites/selectors';
import { sectionGenerator } from './section-generator';
import type { ValidationErrors } from 'calypso/signup/accordion-form/types';
import type { WebsiteContentServerState } from 'calypso/state/signup/steps/website-content/types';
import type { SiteId } from 'calypso/types';

import './style.scss';

const debug = debugFactory( 'calypso:difm' );

const DialogContent = styled.div`
	padding: 16px;
	p {
		font-size: 1rem;
		color: var( --studio-gray-50 );
	}
`;

const DialogButton = styled( Button )`
	box-shadow: 0px 1px 2px rgba( 0, 0, 0, 0.05 );
	border-radius: 5px;
	padding: ${ ( props ) => ( props.primary ? '10px 64px' : '10px 32px' ) };
	--color-accent: #117ac9;
	--color-accent-60: #0e64a5;
	.gridicon {
		margin-left: 10px;
	}
`;

const LinkButton = styled( Button )`
	text-decoration: underline;
	cursor: pointer;

	.formatted-header__subtitle
		button&[type='button'].button.is-borderless.is-primary.is-transparent:focus {
		border-color: transparent;
		box-shadow: none;
	}
`;

const LoadingContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	height: 90vh;
	h1 {
		font-size: 24px;
	}
`;

const PagesNotAvailable = styled( LoadingContainer )`
	img {
		max-height: 200px;
		padding: 24px;
	}
`;

interface WebsiteContentStepProps {
	additionalStepData: object;
	submitSignupStep: ( step: { stepName: string } ) => void;
	goToNextStep: () => void;
	flowName: string;
	stepName: string;
	positionInFlow: string;
	siteId: SiteId | null;
	websiteContentServerState: WebsiteContentServerState;
}

function WebsiteContentStep( {
	additionalStepData,
	stepName,
	submitSignupStep,
	goToNextStep,
	siteId,
	websiteContentServerState,
}: WebsiteContentStepProps ) {
	const [ formErrors, setFormErrors ] = useState< ValidationErrors >( {} );
	const dispatch = useDispatch();
	const translate = useTranslate();
	const websiteContent = useSelector( getWebsiteContent );
	const currentIndex = useSelector( getWebsiteContentDataCollectionIndex );
	const isImageUploading = useSelector( ( state ) =>
		isMediaUploadInProgress( state as WebsiteContentStateModel )
	);
	const hasUnsavedChanges = useSelector( hasUnsavedWebsiteContentChanges );

	const [ isConfirmDialogOpen, setIsConfirmDialogOpen ] = useState( false );
	const translatedPageTitles = useTranslatedPageTitles();
	const context = websiteContentServerState.isStoreFlow
		? BBE_STORE_WEBSITE_CONTENT_FILLING_STEP
		: BBE_WEBSITE_CONTENT_FILLING_STEP;

	const { isPending: isSaving, mutateAsync } = useSaveWebsiteContentMutation(
		siteId,
		websiteContent
	);

	const saveFormValues = async () => {
		try {
			await mutateAsync();
			dispatch( changesSaved() );
			dispatch(
				successNotice( translate( 'Changes saved successfully!' ), {
					id: 'website-content-save-notice',
					duration: 3000,
				} )
			);
		} catch ( error ) {
			dispatch(
				errorNotice(
					translate( 'Failed to save your content. Please check your internet connection.' )
				)
			);
		}
	};

	useEffect( () => {
		const { selectedPageTitles } = websiteContentServerState;
		if ( siteId && selectedPageTitles && selectedPageTitles.length > 0 ) {
			dispatch( initializeWebsiteContentForm( websiteContentServerState, translatedPageTitles ) );
		}
	}, [ dispatch, siteId, translatedPageTitles, websiteContentServerState ] );

	useEffect( () => {
		dispatch( saveSignupStep( { stepName } ) );
	}, [ dispatch, stepName ] );

	const onSubmit = () => {
		const step = {
			stepName,
			...additionalStepData,
		};
		submitSignupStep( step );
		goToNextStep();
	};

	const onChangeField = useCallback(
		( { target: { name } }: ChangeEvent< HTMLInputElement > ) => {
			setFormErrors( { ...formErrors, [ name ]: null } );
		},
		[ formErrors, setFormErrors ]
	);

	const generatedSectionsCallback = useCallback(
		() =>
			sectionGenerator( {
				translate,
				formValues: websiteContent,
				formErrors: formErrors,
				context,
				onChangeField,
			} ),
		[ translate, websiteContent, formErrors, context, onChangeField ]
	);
	const generatedSections = generatedSectionsCallback();

	const prefersReducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	const dialogButtons = [
		<DialogButton onClick={ () => setIsConfirmDialogOpen( false ) }>
			{ translate( 'Cancel' ) }
		</DialogButton>,
		<DialogButton primary onClick={ onSubmit }>
			{ translate( 'Submit' ) }
		</DialogButton>,
	];

	return (
		<>
			<ConfettiAnimation trigger={ ! prefersReducedMotion } />
			<Dialog
				isVisible={ isConfirmDialogOpen }
				onClose={ () => setIsConfirmDialogOpen( false ) }
				buttons={ dialogButtons }
			>
				<DialogContent>
					<h1>{ translate( 'Are you ready to submit your content?' ) }</h1>
					<p>
						{ translate(
							"If you have reviewed our content guidelines and added your final content to the form, click “Submit” to send us your content. We'll then build your new site and email you the details within %d business days.",
							{
								args: [ 4 ],
							}
						) }
					</p>
				</DialogContent>
			</Dialog>

			<AccordionForm
				generatedSections={ generatedSections }
				onErrorUpdates={ ( errors ) => setFormErrors( errors ) }
				formValues={ websiteContent }
				currentIndex={ currentIndex }
				updateCurrentIndex={ ( currentIndex ) => {
					dispatch( updateWebsiteContentCurrentIndex( currentIndex ) );
				} }
				onSubmit={ () => setIsConfirmDialogOpen( true ) }
				saveFormValues={ saveFormValues }
				blockNavigation={ isImageUploading }
				isSaving={ isSaving }
				hasUnsavedChanges={ hasUnsavedChanges }
			/>
		</>
	);
}

function Loader() {
	const translate = useTranslate();
	return (
		<LoadingContainer>
			<h1 className="wp-brand-font">{ translate( 'Loading your site information' ) }</h1>
			<LoadingEllipsis />
		</LoadingContainer>
	);
}

export default function WrapperWebsiteContent(
	props: {
		flowName: string;
		stepName: string;
		positionInFlow: string;
		queryObject: {
			siteSlug?: string;
			siteId?: string;
		};
	} & WebsiteContentStepProps
) {
	const { flowName, stepName, positionInFlow, queryObject } = props;
	const translate = useTranslate();
	const siteId = useSelector( ( state ) => getSiteId( state, queryObject.siteSlug as string ) );

	const { isLoading, isError, data } = useGetWebsiteContentQuery( queryObject.siteSlug );

	const [ isContentGuidelinesDialogOpen, setIsContentGuidelinesDialogOpen ] = useState( true );

	const headerText = translate( 'Website Content' );

	const subHeaderTextTranslateArgs = {
		components: {
			br: <br />,
			Link: (
				<LinkButton
					borderless
					primary
					transparent
					onClick={ () => setIsContentGuidelinesDialogOpen( true ) }
				/>
			),
		},
	};

	const subHeaderText = data?.isStoreFlow
		? translate(
				'Provide content for your website build. You can add products later with the WordPress editor.{{br}}{{/br}}{{br}}{{/br}}{{Link}}View Content Guidelines{{/Link}}',
				subHeaderTextTranslateArgs
		  )
		: translate(
				'Provide content for your website build. You will be able to edit all content later using the WordPress editor.{{br}}{{/br}}{{br}}{{/br}}{{Link}}View Content Guidelines{{/Link}}',
				subHeaderTextTranslateArgs
		  );

	useEffect( () => {
		if ( data?.isWebsiteContentSubmitted ) {
			debug( 'Website content content already submitted, redirecting to home' );
			page( `/home/${ queryObject.siteSlug }` );
		}
	}, [ data, queryObject.siteSlug ] );

	if ( isLoading ) {
		return <Loader />;
	}

	if ( isError || ! ( data?.selectedPageTitles && data?.selectedPageTitles.length ) ) {
		return (
			<PagesNotAvailable>
				<img src={ errorIllustration } alt="" />
				<div>
					{ translate(
						'We could not retrieve your site information. Please {{SupportLink}}contact support{{/SupportLink}}.',
						{
							components: {
								SupportLink: (
									<a className="subtitle-link" rel="noopener noreferrer" href="/help/contact" />
								),
							},
						}
					) }
				</div>
			</PagesNotAvailable>
		);
	}

	return (
		<>
			<Dialog
				isVisible={ isContentGuidelinesDialogOpen }
				onClose={ () => setIsContentGuidelinesDialogOpen( false ) }
				buttons={ [
					<DialogButton primary onClick={ () => setIsContentGuidelinesDialogOpen( false ) }>
						{ translate( 'Acknowledge & Continue' ) }
					</DialogButton>,
				] }
			>
				<DialogContent>
					<h1>{ translate( 'We look forward to building your site!' ) }</h1>
					<p>{ translate( 'Please review the following content submission guidelines:' ) }</p>
					<ul>
						<li>
							{ translate(
								'Do not request content from existing pages, external websites or files, as migrations are not included. '
							) }
						</li>
						<li>
							{ translate(
								'Submit the final content within 14 days; otherwise, we will use AI-generated text and stock images to build your site.'
							) }
						</li>
						<li>
							{ translate( 'Limit page text to under 5000 characters for optimal presentation.' ) }
						</li>
						<li>
							{ translate(
								'Revisions are not included; however, you can edit all content later using the WordPress editor.'
							) }
						</li>
					</ul>
				</DialogContent>
			</Dialog>

			<StepWrapper
				headerText={ headerText }
				subHeaderText={ subHeaderText }
				fallbackHeaderText={ headerText }
				fallbackSubHeaderText={ subHeaderText }
				flowName={ flowName }
				stepName={ stepName }
				positionInFlow={ positionInFlow }
				stepContent={
					<WebsiteContentStep { ...props } websiteContentServerState={ data } siteId={ siteId } />
				}
				goToNextStep={ false }
				hideFormattedHeader={ false }
				hideBack={ false }
				align="left"
				isHorizontalLayout={ true }
				isWideLayout={ true }
			/>
		</>
	);
}

import classNames from 'classnames';

export const LOGO_COLOR_PRIMARY = '#029CD7';
export const LOGO_COLOR_SECONDARY = '#021A23';
export const LOGO_COLOR_SECONDARY_ALT = '#fff';

interface A4ALogoProps {
	full?: boolean;
	size?: number;
	className?: string;
	colors?: {
		primary?: string;
		secondary?: string;
	};
}

const A4ALogo = ( { full = false, size = 32, className, colors }: A4ALogoProps ) => {
	const classes = classNames( className );
	const primaryColor = colors?.primary || LOGO_COLOR_PRIMARY;
	const secondaryColor = colors?.secondary || LOGO_COLOR_SECONDARY;

	if ( full ) {
		return (
			<svg height={ size } className={ classes } viewBox="0 0 494.35 38.19">
				<path
					d="M179.25 38.19c-12.58 0-20.74-9.07-20.74-18.51v-1.17c0-9.6 8.16-18.51 20.74-18.51 12.58 0 20.81 8.91 20.81 18.51v1.17c0 9.44-8.16 18.51-20.81 18.51Zm14.08-19.58c0-6.88-5-13-14.08-13s-14 6.13-14 13v.86c0 6.88 5 13.12 14 13.12s14.08-6.24 14.08-13.12v-.86Z"
					fill={ primaryColor }
				/>
				<path
					className="secondary-path"
					d="M37.12 36.8 32.43 28H11.57L7 36.8H0L19.2 1.28h5.55L44.27 36.8h-7.15ZM21.81 8.21l-7.73 14.94h15.73l-8-14.94ZM74.56 38.19c-12.75 0-18.67-6.94-18.67-16.16V1.28h6.62v20.85c0 6.56 4.32 10.46 12.53 10.46 8.43 0 11.89-3.9 11.89-10.46V1.28h6.67V22c0 8.83-5.6 16.19-19.04 16.19ZM130.72 6.83v30h-6.67v-30h-15.52V1.28h37.71v5.55h-15.52ZM259.47 36.8V8.69l-1.76 3.1-14.88 25h-3.25l-14.72-25-1.76-3.1V36.8h-6.51V1.28h9.23l14 24.37 1.66 3 1.65-3L257 1.28h9.12V36.8h-6.65ZM316.54 36.8l-4.7-8.8H291l-4.53 8.8h-7l19.2-35.52h5.54l19.47 35.52h-7.14ZM301.23 8.21l-7.73 14.94h15.73l-8-14.94ZM350.56 6.83v30h-6.66v-30h-15.52V1.28h37.7v5.55h-15.52ZM399.47 6.83v30h-6.67v-30h-15.52V1.28H415v5.55h-15.53ZM431.42 36.8V4.64c2.66 0 3.73-1.44 3.73-3.36H438V36.8h-6.58ZM490.19 11.31A20.69 20.69 0 0 0 476 5.6c-9.49 0-14.83 6.51-14.83 13.28v.69c0 6.72 5.39 13 15.31 13a20.78 20.78 0 0 0 13.92-5.71l4 4.21a26.53 26.53 0 0 1-18.4 7.12c-13.44 0-21.6-8.75-21.6-18.35v-1.17c0-9.6 8.91-18.67 21.92-18.67 7.52 0 14.35 3.15 18 7.09l-4.13 4.22ZM180.072 13.173l-6.107 9.46a2.58 2.58 0 0 0 .767 3.567l.009.005a2.58 2.58 0 0 0 3.567-.768l6.108-9.46a2.58 2.58 0 0 0-.768-3.566l-.009-.006a2.58 2.58 0 0 0-3.567.768Z"
					fill={ secondaryColor }
				/>
			</svg>
		);
	}

	return (
		<svg width={ size } height={ size } className={ classes } viewBox="0 0 64 64">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M53.6471 31.5984C53.6471 21.029 45.9236 11.6027 31.9584 11.6027C17.9933 11.6027 10.3514 21.029 10.3514 31.5984V32.9105C10.3514 43.4815 17.9933 53.0691 31.9584 53.0691C45.9236 53.0691 53.6471 43.4815 53.6471 32.9105V31.5984ZM31.9584 61.6733C12.5696 61.6733 0 47.7437 0 33.2378V31.4371C0 16.6838 12.5696 3 31.9584 3C51.4304 3 64 16.6838 64 31.4371V33.2378C64 47.7437 51.4304 61.6733 31.9584 61.6733Z"
				fill={ primaryColor }
			/>
			<path
				className="secondary-path"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M38.8263 22.3617C40.5964 23.5221 41.0927 25.934 39.9441 27.7441L30.9904 41.8447C29.8402 43.6563 27.4737 44.1803 25.7065 43.02C23.9394 41.8566 23.4372 39.4507 24.5888 37.6391L33.5425 23.5385C34.6926 21.7284 37.0591 21.2029 38.8263 22.3617Z"
				fill={ secondaryColor }
			/>
		</svg>
	);
};

export default A4ALogo;

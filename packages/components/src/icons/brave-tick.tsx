import { Path, SVG } from '@wordpress/primitives';

const Icon = ( { className }: { className?: string } ) => {
	return (
		<SVG
			className={ className }
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				d="M14.894 9.13792C15.2823 8.74426 15.5 8.21361 15.5 7.66064C15.5 7.10768 15.2823 6.57703 14.894 6.18337L14.1322 5.42934C13.9598 5.25219 13.8633 5.01481 13.8629 4.76764V3.88281C13.8611 3.3304 13.6408 2.80106 13.2502 2.4104C12.8596 2.0198 12.3303 1.7995 11.7778 1.7977H10.893C10.6458 1.7974 10.4085 1.7008 10.2313 1.5284L9.47728 0.766682C9.08361 0.378374 8.55296 0.160645 8 0.160645C7.44704 0.160645 6.91639 0.378358 6.52272 0.766682L5.76869 1.5284C5.59154 1.7008 5.35416 1.79739 5.107 1.7977H4.22217C3.66976 1.7995 3.14042 2.01981 2.74976 2.4104C2.35915 2.80106 2.13885 3.33039 2.13705 3.88281V4.76764C2.13675 5.01481 2.04016 5.25219 1.86776 5.42934L1.10604 6.18337C0.717729 6.57703 0.5 7.10768 0.5 7.66064C0.5 8.21361 0.717714 8.74426 1.10604 9.13792L1.86776 9.89195C2.04015 10.0691 2.13675 10.3065 2.13705 10.5536V11.4385C2.13886 11.9909 2.35917 12.5202 2.74976 12.9109C3.14042 13.3015 3.66975 13.5218 4.22217 13.5236H5.107C5.35416 13.5239 5.59154 13.6205 5.76869 13.7929L6.52272 14.5546C6.91579 14.944 7.44668 15.1625 8 15.1625C8.55332 15.1625 9.08421 14.944 9.47728 14.5546L10.2313 13.7929C10.4085 13.6205 10.6458 13.5239 10.893 13.5236H11.7778C12.3302 13.5218 12.8596 13.3015 13.2502 12.9109C13.6408 12.5202 13.8611 11.9909 13.8629 11.4385V10.5536C13.8632 10.3065 13.9598 10.0691 14.1322 9.89195L14.894 9.13792ZM10.716 6.5296L7.63837 9.60726C7.53036 9.7157 7.38362 9.77666 7.23058 9.77666C7.07755 9.77666 6.93082 9.71571 6.82279 9.60726L5.28396 8.06843C5.14673 7.92116 5.09618 7.71299 5.15052 7.51915C5.20492 7.32529 5.3564 7.17382 5.55026 7.11941C5.74412 7.06507 5.95228 7.11562 6.09955 7.25285L7.23059 8.38389L9.90046 5.71402C10.0477 5.57679 10.2559 5.52624 10.4497 5.58058C10.6436 5.63498 10.7951 5.78646 10.8495 5.98032C10.9038 6.17418 10.8533 6.38234 10.716 6.5296Z"
				fill="#DDDDDD"
			/>
		</SVG>
	);
};

export default Icon;

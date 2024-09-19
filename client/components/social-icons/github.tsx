import clsx from 'clsx';
import './style.scss';

type GitHubIconProps = {
	isDisabled?: boolean;
	width?: number;
	height?: number;
};

const GitHubIcon = ( { isDisabled = false, width = 20, height = 20 }: GitHubIconProps ) => {
	return (
		<svg
			width={ width }
			height={ height }
			viewBox="0 0 19 19"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={ clsx( 'social-icons social-icons__apple', {
				'social-icons--enabled': ! isDisabled,
				'social-icons--disabled': !! isDisabled,
			} ) }
		>
			<g clipPath="url(#clip0_2014_1339)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M9.47169 0C4.23409 0 0 4.26531 0 9.54207C0 13.7601 2.71293 17.3305 6.47648 18.5942C6.94702 18.6892 7.11938 18.3889 7.11938 18.1363C7.11938 17.9151 7.10387 17.1568 7.10387 16.3668C4.46907 16.9356 3.9204 15.2293 3.9204 15.2293C3.49697 14.1234 2.86958 13.8392 2.86958 13.8392C2.00721 13.2546 2.9324 13.2546 2.9324 13.2546C3.88899 13.3178 4.39094 14.2341 4.39094 14.2341C5.2376 15.6874 6.60192 15.2768 7.15079 15.024C7.22911 14.4078 7.48018 13.9813 7.74677 13.7444C5.64533 13.5232 3.43435 12.7017 3.43435 9.03644C3.43435 7.99377 3.81047 7.1407 4.40645 6.47725C4.31242 6.24034 3.98302 5.26067 4.50067 3.94948C4.50067 3.94948 5.30042 3.69666 7.10367 4.92895C7.87571 4.72008 8.6719 4.61382 9.47169 4.61293C10.2714 4.61293 11.0867 4.72363 11.8395 4.92895C13.643 3.69666 14.4427 3.94948 14.4427 3.94948C14.9604 5.26067 14.6308 6.24034 14.5367 6.47725C15.1484 7.1407 15.509 7.99377 15.509 9.03644C15.509 12.7017 13.2981 13.5073 11.1809 13.7444C11.526 14.0445 11.8238 14.6131 11.8238 15.5137C11.8238 16.7933 11.8083 17.8203 11.8083 18.1361C11.8083 18.3889 11.9809 18.6892 12.4512 18.5944C16.2148 17.3303 18.9277 13.7601 18.9277 9.54207C18.9432 4.26531 14.6936 0 9.47169 0Z"
					fill="#24292F"
				/>
			</g>
			<defs>
				<clipPath id="clip0_2014_1339">
					<rect width="19" height="18.6122" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default GitHubIcon;

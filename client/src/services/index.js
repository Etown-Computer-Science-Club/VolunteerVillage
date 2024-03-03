// eslint-disable-next-line no-undef
const BASE_URL = process.env.NODE_ENV === 'production'
	? 'https://api.volunteervillage.co/'
	: 'http://localhost:8000/';

export default BASE_URL;
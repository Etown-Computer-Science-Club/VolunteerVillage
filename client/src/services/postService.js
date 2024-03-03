import axios from 'axios';
const API_URL = process.env.NODE_ENV === 'production'
	? 'https://api.wordwave.us/post'
	: 'http://localhost:8000/post';

export default class PostService {
	static async getEvents() {
		const { data } = await axios.get(API_URL + endpoint)
		return (data)
	}
}
import axios from 'axios';
import BASE_URL from '.';

const API_URL = BASE_URL + 'posts';

export default class PostService {
	static async getEvents() {
		const { data } = await axios.get(API_URL)
		return (data)
	}
	static async getMyEvents() {
		const { data } = await axios.get(API_URL + "/me")
		return (data)
	}
	static async createEvent(event) {
		const { data } = await axios.post(API_URL, event)
		return (data)
	}
	static async deleteEvent(postID) {
		const { data } = await axios.delete(API_URL + "/" + postID,)
		return (data)
	}
}
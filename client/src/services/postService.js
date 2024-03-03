import axios from 'axios';
const API_URL = process.env.NODE_ENV === 'production'
	? 'https://api.wordwave.us/posts'
	: 'http://localhost:8000/posts';

export default class PostService {
	static async getEvents() {
		const { data } = await axios.get(API_URL)
		return (data)
	}
    static async getMyEvents(userID) {
		const { data } = await axios.get(API_URL + "/" + userID)
		return (data)
	}
    static async createEvent(event) {
		const { data } = await axios.post(API_URL + "/create", event)
		return (data)
	}
    static async deleteEvent(postID) {
		const { data } = await axios.delete(API_URL + "/" + postID, )
		return (data)
	}
}
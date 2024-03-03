import axios from 'axios';
const API_URL = process.env.NODE_ENV === 'production'
	? 'https://api.wordwave.us/volunteers/'
	: 'http://localhost:8000/volunteers/';

export default class VolunteerService {
	static async getAttendees (postID) {
        console.log("calling getAttendees at: " + API_URL+postID)

		const { data } = await axios.get(API_URL+postID)
		return (data)
	}
}
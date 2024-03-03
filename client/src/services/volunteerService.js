import axios from 'axios';
const API_URL = process.env.NODE_ENV === 'production'
	? 'https://api.wordwave.us/volunteers/'
	: 'http://localhost:8000/volunteers/';

export default class VolunteerService {
	static async getAttendees (postID) {
		const { data } = await axios.get(API_URL+postID)
		return (data)
	}
    static async confirmAttendee (postID, userID) {
		const { data } = await axios.post(API_URL + postID + "/" + userID + "/confirm")
        return (data)
	}
}
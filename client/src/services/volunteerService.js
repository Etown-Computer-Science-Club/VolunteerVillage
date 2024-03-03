import axios from 'axios';
import BASE_URL from '.';

const API_URL = BASE_URL + '/volunteers';

export default class VolunteerService {
	static async getAttendees(postID) {
		const { data } = await axios.get(API_URL + postID)
		return (data)
	}
	static async confirmAttendee(postID, userID) {
		const { data } = await axios.post(API_URL + postID + "/" + userID + "/confirm")
		return (data)
	}
	static async deleteAttendee(postID, userID) {
		const { data } = await axios.delete(API_URL + postID + "/" + userID)
		return (data)
	}
	static async addVolunteer(postID) {
		const { data } = await axios.post(API_URL + postID)
		return (data)
	}
}
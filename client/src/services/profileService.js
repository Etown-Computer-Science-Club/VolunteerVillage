import axios from 'axios';
const API_URL = process.env.NODE_ENV === 'production'
	? 'https://api.wordwave.us/profile'
	: 'http://localhost:8000/profile';

export default class ProfileService {
	static async getProfile() {
		const { data } = await axios.get(API_URL)
		return (data)
	}

	static async updateProfile(name, profilePicture) {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('file', profilePicture);

		const { data } = await axios.put(API_URL, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});

		return (data)
	}
}
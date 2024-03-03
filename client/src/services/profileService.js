import axios from 'axios';
import BASE_URL from '.';

const API_URL = BASE_URL + '/profile';

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
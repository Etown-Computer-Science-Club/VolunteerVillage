import axios from 'axios';
import BASE_URL from '.';

const API_URL = BASE_URL + 'leaderboard';

export default class LeaderboardService {
	static async getTop10() {
		const { data } = await axios.get(API_URL)
		return (data)
	}
}
import axios from 'axios';
const API_URL = process.env.NODE_ENV === 'production'
	? 'https://api.wordwave.us/leaderboard'
	: 'http://localhost:8000/leaderboard';

export default class LeaderboardService {
	static async getTop10() {
		const { data } = await axios.get(API_URL)
		return (data)
	}
}
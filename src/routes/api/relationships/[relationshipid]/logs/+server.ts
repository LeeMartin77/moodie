import { getUserRelationships, insertRelationshipMoodLog } from '$lib/storage';
import { userIdGenerator } from '$lib/userIdGenerator';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request, locals, params: { relationshipid } }) => {
	const session = await locals.getSession();
	if (!session || !session.user) {
		throw redirect(302, '/auth/signin');
	}
	const userid = userIdGenerator(session.user);
	const data = await request.json();
	const fields = ['partnername', 'moodid', 'needid'];
	const neededData = fields.map((x) => {
		return data[x];
	});
	try {
		if (neededData.some((x) => x === undefined)) {
			throw new Error('Missing required data');
		}
		const [partnername, feeling, moodid, needid] = neededData as string[];

		const userRelationships = await getUserRelationships(userid);
		const relationship = userRelationships.find((x) => x.relationshipid === relationshipid);
		if (!relationship) {
			throw new Error('Invalid relationshipid');
		}

		const feelingInt = parseInt(feeling);

		if (isNaN(feelingInt)) {
			throw new Error('Invalid feeling');
		}

		const mood = Array.from(relationship.moods).find((x) => x.id === moodid);
		const need = Array.from(relationship.needs).find((x) => x.id === needid);

		if (!mood) {
			throw new Error('Invalid moodid');
		}

		if (!need) {
			throw new Error('Invalid needid');
		}

		const newlog = await insertRelationshipMoodLog({
			relationshipid,
			userid,
			partnername,
			feeling: feelingInt,
			moodid: mood.id,
			mood: mood.name,
			positive: mood.positive,
			negative: mood.negative,
			needid: need.id,
			need: need.name,
			active: need.active,
			passive: need.passive
		});
		return json(newlog, { status: 200 });
	} catch (err: any) {
		throw error(400, err.message);
	}
};

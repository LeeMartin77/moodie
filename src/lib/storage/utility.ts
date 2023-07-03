import type { types } from 'cassandra-driver';

export function rowToObject<T>(row: types.Row): T {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const constructed: any = {};
	row.keys().forEach((key) => (constructed[key] = row.get(key)));
	return constructed as T;
}

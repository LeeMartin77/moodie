<script lang="ts">
	import type { UserRelationship } from '$lib/storage';
	import { liveQuery, type Observable } from 'dexie';
	import { db } from '$lib/indexdb';
	import { onMount } from 'svelte';

	export let relationship: UserRelationship;
	export let notificationsEnabled: boolean;

	let notificationsOn: Observable<boolean>;

	const turnOnNotifications = async () => {
		const exists = await db.notifications
			.where('relationshipid')
			.equals(relationship.relationshipid)
			.first();
		if (exists) {
			await db.notifications.update(relationship.relationshipid, {
				enabled: true
			});
		} else {
			await db.notifications.add({
				relationshipid: relationship.relationshipid,
				enabled: true
			});
		}
	};

	const toggleNotifications = async () => {
		if (!$notificationsOn) {
			if (Notification.permission !== 'granted') {
				Notification.requestPermission().then((perm) => {
					if (perm === 'granted') {
						turnOnNotifications();
					}
				});
			} else {
				turnOnNotifications();
			}
		} else {
			await db.notifications.update(relationship.relationshipid, {
				enabled: false
			});
		}
	};

	onMount(() => {
		notificationsOn = liveQuery(() => {
			return db.notifications
				.where('relationshipid')
				.equals(relationship.relationshipid)
				.first()
				.then((val) => {
					return (val && val.enabled && Notification.permission === 'granted') || false;
				});
		});
	});
</script>

<div class="relationship-title">
	<h2>{relationship.name}</h2>
	{#if notificationsEnabled}
		{#if $notificationsOn}
			<button
				aria-label="Toggle Notifications - Currently On"
				on:click={toggleNotifications}
				class="notification-toggle-button"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-bell-fill"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"
					/>
				</svg>
			</button>
		{:else}
			<button
				aria-label="Toggle Notifications - Currently Off"
				on:click={toggleNotifications}
				class="notification-toggle-button"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-bell-slash"
					viewBox="0 0 16 16"
				>
					<path
						d="M5.164 14H15c-.299-.199-.557-.553-.78-1-.9-1.8-1.22-5.12-1.22-6 0-.264-.02-.523-.06-.776l-.938.938c.02.708.157 2.154.457 3.58.161.767.377 1.566.663 2.258H6.164l-1 1zm5.581-9.91a3.986 3.986 0 0 0-1.948-1.01L8 2.917l-.797.161A4.002 4.002 0 0 0 4 7c0 .628-.134 2.197-.459 3.742-.05.238-.105.479-.166.718l-1.653 1.653c.02-.037.04-.074.059-.113C2.679 11.2 3 7.88 3 7c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0c.942.19 1.788.645 2.457 1.284l-.707.707zM10 15a2 2 0 1 1-4 0h4zm-9.375.625a.53.53 0 0 0 .75.75l14.75-14.75a.53.53 0 0 0-.75-.75L.625 15.625z"
					/>
				</svg>
			</button>
		{/if}
	{/if}
</div>

<style>
	.relationship-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1em;
	}

	.notification-toggle-button {
		background-color: rgba(0, 0, 0, 0.05);
		border: none;
		padding: 0.5em;
		border-radius: 0.5em;
	}
</style>

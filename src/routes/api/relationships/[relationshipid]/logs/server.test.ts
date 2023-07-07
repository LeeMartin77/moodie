import { describe, test, expect, vi, beforeEach } from "vitest";
import * as storage from '$lib/storage';
import * as userIdGen from '$lib/userIdGenerator';
import { POST } from "./+server";
import { error, json, redirect } from '@sveltejs/kit';


describe("POST", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  })
  test("Happy Path", async () => {
    const mockGet = vi.spyOn(storage, 'getUserRelationships');
    const mockInsert = vi.spyOn(storage, 'insertRelationshipMoodLog');
    const mockGenerator = vi.spyOn(userIdGen, 'userIdGenerator');

    const fakeUserId = 'my-genned-fake-user-id'
    mockGenerator.mockReturnValue(fakeUserId)

    const inputData = {
      partnername: 'thepartnername',
      feeling: 0,
      moodid: 'somemoodid',
      needid: 'someneedid'
    }
    const request = {
      json: vi.fn().mockResolvedValue(inputData)
    }

    const fakeSession = {
      user: {
        email: 'joe@blogs.com'
      }
    }
    const locals = {
      getSession: vi.fn().mockResolvedValue(fakeSession)
    }

    const params = {
      relationshipid: 'fake-relationship-id',
    }

    const fakeRelationship = [{
      relationshipid: params.relationshipid,
      moods: [{
        id: inputData.moodid
      }],
      needs: [{
        id: inputData.needid
      }]
    } as any]

    mockGet.mockResolvedValue(fakeRelationship);

    const dummyLog = {
      whoami: 'newlog'
    } as any;
    mockInsert.mockResolvedValue(dummyLog)

    //mockGenerator.mockReturnValue('fake-user-id-from-gen');

    const res = await POST({
      request,
      locals,
      params
    } as any)

    expect(res.status).toBe(200);
    expect(await res.json()).toStrictEqual(dummyLog);
  })
})
import type { DefaultSession } from "@auth/core/types"
import { createHash } from 'node:crypto';

export const userIdGenerator = (user: DefaultSession['user']) => {
  // TODO: Look into id gen before taking it too far
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return createHash('sha256').update(user!.email!).digest('base64')
}
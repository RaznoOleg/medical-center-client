import { RootState } from '../../store';

export function prepareHeaders(
  headers: Headers,
  { getState }: { getState: () => unknown }
) {
  const { accessToken } = (getState() as RootState).auth;

  if (accessToken) headers.set('authorization', `Bearer ${accessToken}`);
}

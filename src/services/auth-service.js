const fakeFetch = async (payload, ms = 2000) =>
  new Promise((resolve) => setTimeout(resolve, ms)).then(() => payload);

export default class AuthService {
  login = async () => {
    const response = await fakeFetch({
      fields: [],
      message: 'Ok',
      errorMessage: null,
      payload: { token: 'my-fake-token', time: '120 minutes' },
    });
    return response;
  };
}

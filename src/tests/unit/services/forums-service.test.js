import ForumsService from '../../../services/forums-service';

let forumsService;

beforeAll(() => {
  forumsService = new ForumsService();
});

describe('Forums Service getByFilters', () => {
  test('When parameters are valid, expect a list of forums in response', async () => {
    // Arrange
    const filters = {
      page: 1,
    };

    // Act
    const response = await forumsService.get(filters);

    // Assert
    expect(response).not.toBeNull();
  });
});

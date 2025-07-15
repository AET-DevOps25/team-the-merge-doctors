const SHARED_CONFIG = {
  client: 'react-query',
  baseUrl: {
    getBaseUrlFromSpecification: true,
  },
  mock: false,
};

module.exports = {
  user: {
    output: {
      ...SHARED_CONFIG,
      target: 'src/api/user.ts',
    },
    input: {
      target: '../server/userservice/schema/user-service-schema.json',
    },
  },
  rating: {
    output: {
      ...SHARED_CONFIG,
      target: 'src/api/rating.ts',
    },
    input: {
      target: '../server/ratingservice/schema/rating-service-schema.json',
    },
  },
  mentor: {
    output: {
      ...SHARED_CONFIG,
      target: 'src/api/mentor.ts',
    },
    input: {
      target:
        '../server/mentorshipservice/schema/mentorship-service-schema.json',
    },
  },
};

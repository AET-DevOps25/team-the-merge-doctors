const SHARED_CONFIG = {
  client: 'react-query',
  mock: false,
};

module.exports = {
  user: {
    output: {
      ...SHARED_CONFIG,
      target: 'src/api/user.ts',
    },
    input: {
      target: '../server/user/user.yaml',
    },
  },
  rating: {
    output: {
      ...SHARED_CONFIG,
      target: 'src/api/rating.ts',
    },
    input: {
      target: '../server/user/rating.yaml',
    },
  },
  appointment: {
    output: {
      ...SHARED_CONFIG,
      target: 'src/api/appointment.ts',
    },
    input: {
      target: '../server/user/appointment.yaml',
    },
  },
  mentor: {
    output: {
      ...SHARED_CONFIG,
      target: 'src/api/mentor.ts',
    },
    input: {
      target: '../server/user/mentor.yaml',
    },
  },
};

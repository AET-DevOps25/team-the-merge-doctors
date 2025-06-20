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
      target: '../server/userservice/user-openapi.yaml',
    },
  },
  rating: {
    output: {
      ...SHARED_CONFIG,
      target: 'src/api/rating.ts',
    },
    input: {
      target: '../server/ratingservice/rating-openapi.yaml',
    },
  },
  appointment: {
    output: {
      ...SHARED_CONFIG,
      target: 'src/api/appointment.ts',
    },
    input: {
      target: '../server/appointmentservice/appointment-openapi.yaml',
    },
  },
  mentor: {
    output: {
      ...SHARED_CONFIG,
      target: 'src/api/mentor.ts',
    },
    input: {
      target: '../server/mentorshipservice/mentor-openapi.yaml',
    },
  },
};

const articles = {
  data: {
    articles: {
      links: {
        next: 'https://ah-backend-poseidon-staging.herokuapp.com/api/articles?page=2',
        previous: null,
      },
      current_page: 1,
      results: [
        {
          slug: 'the-20190111145839981441',
          title: 'the sand in the sky',
          description: 'this the story that am going to end here..',
          body: 'this is the body that am...',
          created_on: '2019-01-11T14:58:39.981957Z',
          average_rating: 0,
          updated_on: '2019-01-11T14:58:39.981999Z',
          image_url: null,
          author: {
            username: 'John',
            email: 'john@dev.com',
            bio: '',
            image: null,
            following: false,
          },
          favourites_count: 0,
          tags: [
            'React',
          ],
          view_counts: 0,
          read_time: '0 min read',
          id: 34,
          likes: 0,
          dislikes: 0,
        },
      ],
    },
  },
};

const article = {
  slug: 'the-20190111145839981441',
  title: 'the sand in the sky',
  description: 'this the story that am going to end here..',
  body: 'this is the body that am...',
  created_on: '2019-01-11T14:58:39.981957Z',
  average_rating: 0,
  updated_on: '2019-01-11T14:58:39.981999Z',
  image_url: null,
  author: {
    username: 'John',
    email: 'john@dev.com',
    bio: '',
    image: null,
    following: false,
  },
  favourites_count: 0,
  tags: [
    'React',
  ],
  view_counts: 0,
  read_time: '0 min read',
  id: 34,
  likes: 0,
  dislikes: 0,
};

const error = {
  error: {
    articles: {
      detail: 'Authentication credentials were not provided.',
    },
  },
};

export { articles, article, error };

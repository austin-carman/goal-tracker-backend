const users = [
    {
      user_username: 'abc12',
      user_password: '$2a$08$bVCTwdvkQkLv5KVBhiWM5uHcy3XmskNUz5HnYAqmzUai5WoThT7CC'
    },
    {
        user_username: 'samantha',
        user_password: '$2a$08$bVCTwdvkQkLv5KVBhiWM5uHcy3XmskNUz5HnYAqmzUai5WoThT7CC'
    }
  ]

const goals = [
    {
        user_id: 1,
        goal_title: 'Read 5 books',
    },
    {
        user_id: 1,
        goal_title: 'Organize closet',
    },
    {
        user_id: 2,
        goal_title: 'Save for house down payment',
    },
]

const steps = [
    {
        goal_id: 1,
        step_number: 1,
        step_text: 'Pick 5 books to read',
    },
    {
        goal_id: 1,
        step_number: 2,
        step_text: 'Read 30 min every day',
    },
    {
        goal_id: 2,
        step_number: 1,
        step_text: 'Donate old clothes',
    },
    {
        goal_id: 3,
        step_number: 1,
        step_text: 'Save 20% of each paycheck',
    }
]

const likes = [
    {
        user_id: 2,
        goal_id: 1
    }
]

const comments = [
    {
        user_id: 2,
        goal_id: 1,
        comment_text: 'You should read unbroken'
    },
    {
        user_id: 1,
        goal_id: 1,
        comment_text: `I've been wanting to read that!`
    },
]

const relationships = [
    {
        follower_id: 2,
        following_id: 1
    }
]

exports.seed = async function (knex) {
   await knex('users').insert(users)
   await knex('goals').insert(goals)
   await knex('steps').insert(steps)
   await knex('likes').insert(likes)
   await knex('comments').insert(comments)
   await knex('relationships').insert(relationships)
};

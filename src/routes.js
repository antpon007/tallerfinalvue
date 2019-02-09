import questions from './components/Questions.vue';
import signin from './components/Signin.vue';
import signup from './components/Signup.vue';
import principal from './components/Principal.vue';

const routes = [{
    path: '/app/v1/questions',
    component: questions,
    name: 'questions',
  },
  {
    path: '/app/v1/',
    component: principal,
    name: 'principal',
  },
  {
    path: '/app/v1/signin',
    component: signin,
    name: 'signin',
  },
  {
    path: '/app/v1/signup',
    component: signup,
    name: 'signup',
  },
];

export default routes;

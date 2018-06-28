/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

// The top-level (parent) route


const routes =  {
  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '/',
      load: () => import(/* webpackChunkName: 'home' */ './login'),
    },
    // {
    //   path: '/contact',
    //   load: () => import(/* webpackChunkName: 'contact' */ './contact'),
    // },
    // {
    //   path: '/exercise-question/:ID',
    //   load: () => import(/* webpackChunkName: 'contact' */ './exercise-question'),
    // },
    //   path: '/student/student-exercise/:STUDENT_ID/:EXERCISE_ID',
    //   load: () => import(/* webpackChunkName: 'contact' */ './student-exercise'),
    // },
    //

    // {
    //   path: '/admin/manage-student-teacher',
    //   load: () => import(/* webpackChunkName: 'contact' */ './manage-student-teacher'),
    // },


    // {
    //   path: '/admin/manage-room',
    //   load: () => import(/* webpackChunkName: 'contact' */ './manage-room'),
    // },

    // {
    //   path: '/admin/edit-student-teacher/:ID/:STATUS',
    //   load: () => import(/* webpackChunkName: 'contact' */ './edit-student-teacher'),
    // },

    // {
    //   path: '/admin/manage-course',
    //   load: () => import(/* webpackChunkName: 'contact' */ './manage-course'),
    // },

    // {
    //   path: '/admin/add-course-student',
    //   load: () => import(/* webpackChunkName: 'contact' */ './add-courseStudent'),
    // },
    {
      path: '/login',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    // {
    //   path: '/register',
    //   load: () => import(/* webpackChunkName: 'register' */ './register'),
    // },
    // {
    //   path: '/about',
    //   load: () => import(/* webpackChunkName: 'about' */ './about'),
    // },
    // {
    //   path: '/privacy',
    //   load: () => import(/* webpackChunkName: 'privacy' */ './privacy'),
    // },
    {
      path: '/admin/:key',
      load: () => import(/* webpackChunkName: 'admin' */ './admin'),
    },
    {
      path: '/student-course',
      load: () =>
        import(/* webpackChunkName: 'student-course' */ './student-course'),
    },
    {
      path: '/student/:key',
      load: () => import(/* webpackChunkName: 'student' */ './student'),
    },
    {
      path: '/teacher-course',
      load: () =>
        import(/* webpackChunkName: 'teacher-course' */ './teacher-course'),
    },
    {
      path: '/teacher/:key',
      load: () =>
        import(/* webpackChunkName: 'teacher' */ './teacher'),
    },

    {
      path: '/teacherassistant-course',
      load: () =>
        import(/* webpackChunkName: 'teacher' */ './teacherAssistant-course'),
    },

    {
      path: '/teacherassistant/:key',
      load: () =>
        import(/* webpackChunkName: 'teacher-course' */ './teacherAssistant'),
    },


    {
      path: '*',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],


  async action({next}) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - www.reactstarterkit.com`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;

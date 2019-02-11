import loadable from '@loadable/component';

export const Main = loadable(() => import('./components/Main'));
export const About = loadable(() => import('./components/About'));
export const Features = loadable(() => import('./components/Features'));
export const Posts = loadable(() => import('./containers/Posts'));

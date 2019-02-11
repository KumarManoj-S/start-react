import { combineReducers } from 'redux';
import currentUser from './currentUser';
import organizations from './organisations';
import funding from './funding';
import people from './people';
import personView from './personView';
import organizationView from './organizationView';
import admin from './admin';
import adminView from './adminView';
import fundingView from './fundingView';
import sectors from './sectors';
import investors from './investors';

export default combineReducers({
  currentUser,
  organizations,
  funding,
  people,
  personView,
  organizationView,
  admin,
  adminView,
  fundingView,
  sectors,
  investors,
});

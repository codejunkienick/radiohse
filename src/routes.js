import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    NotFound,
    CommingSoon
  } from 'containers';

export default () => {

    let Index = CommingSoon;

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>

      <IndexRoute component={Index}/>

      <Route path="*" component={NotFound} status={404} />
      
    </Route>
  );
};

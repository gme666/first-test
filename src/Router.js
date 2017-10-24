import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import BigCalendar from './components/BigCalendar';
import LineChart from './components/LineChart';
import UsageForm from './components/UsageForm';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene
          key="login"
          component={LoginForm}
          title="Sign in / Sign up"
        />
      </Scene>

      <Scene key="main">
        <Scene
          rightTitle="Chart"
          onRight={() => Actions.showChart()}
          key="bigCalendar"
          component={BigCalendar}
          title="Calendar"
          initial
        />
        <Scene
          key="showChart"
          component={LineChart}
          title="Line chart"
        />
        <Scene
          key="editUsage"
          component={UsageForm}
          title="Edit"
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;

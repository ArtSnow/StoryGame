import React, { useRef } from 'react';
import LoginScreen from '../screens/LoginScreen';
import { GeneralStore } from './store';
import MasterScreen from './MasterScreen';
import PlayerScreen from './PlayerScreen';

const MainComponent: React.FC = () => {
    const generalStore = useRef(new GeneralStore()).current;

    const role = generalStore.getRole();

    if (!role) {
        return <LoginScreen join={generalStore.join} />;
    }

    if (role === 'master') {
        return <MasterScreen getId={generalStore.getId} getPassword={generalStore.getPassword} />;
    }

    return <PlayerScreen getId={generalStore.getId} getPassword={generalStore.getPassword} />;
};

export default MainComponent;

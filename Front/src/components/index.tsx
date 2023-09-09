import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Input } from '@chakra-ui/react';
import { LoginStore } from '../store/login-store';

const MainComponent: React.FC = () => {
    const loginStore = useRef(new LoginStore()).current;

    return <Input value={loginStore.password} onChange={(e) => loginStore.setPassword(e.target.value)} />;
};

export default observer(MainComponent);

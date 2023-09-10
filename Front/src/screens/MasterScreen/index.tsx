import React, { useRef } from 'react';
import { MasterStore } from './store';
import { Box } from '@chakra-ui/react';
import Chat from '../../components/Chat';
import Players from '../../components/Players';

type MasterScreenProps = {
    getId(): string
    getPassword(): string
};

const MasterScreen: React.FC<MasterScreenProps> = (props) => {
    const { getId, getPassword } = props;

    const masterStore = useRef(new MasterStore({ getId, getPassword })).current;

    return <Box>
        <Chat
            getMessages={masterStore.getMessages}
        />
        <Players
            getPlayers={masterStore.getPlayers}
            onSaveProps={masterStore.savePlayerProps}
        />
    </Box>;
};

export default MasterScreen;

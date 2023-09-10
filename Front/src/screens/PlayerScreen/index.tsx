import React, { useRef } from 'react';
import { PlayerStore } from './store';
import { Box } from '@chakra-ui/react';
import Chat from '../../components/Chat';
import Players from '../../components/Players';

type PlayerScreenProps = {
    getId(): string
    getPassword(): string
};

const PlayerScreen: React.FC<PlayerScreenProps> = (props) => {
    const { getId, getPassword } = props;

    const masterStore = useRef(new PlayerStore({ getId, getPassword })).current;

    return <Box>
        <Chat
            getMessages={masterStore.getMessages}
        />
        <Players
            getPlayers={masterStore.getPlayers}
        />
    </Box>;
};

export default PlayerScreen;

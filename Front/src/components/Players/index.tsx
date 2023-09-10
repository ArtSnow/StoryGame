import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@chakra-ui/react';
import { Player } from '../../service/state';
import PlayerItem from './PlayerItem';

type PlayersProps = {
    getPlayers(): Player[];
};

const Players: React.FC<PlayersProps> = (props) => {
    const { getPlayers } = props;

    const players = getPlayers();

    return <Box>
        {players.map((el) => <PlayerItem
            key={el.id}
            name={el.name}
            img={el.img}
            hp={el.hp}
            properties={el.properties}
        />)}
    </Box>;
};

export default observer(Players);

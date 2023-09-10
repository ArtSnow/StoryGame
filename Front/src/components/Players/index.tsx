import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@chakra-ui/react';
import { Player, Property } from '../../service/state';
import PlayerItem from './PlayerItem';

type PlayersProps = {
    getPlayers(): Player[]
    onSaveProps?(id: string, props: Property[]): void
};

const Players: React.FC<PlayersProps> = (props) => {
    const { getPlayers, onSaveProps } = props;

    const players = getPlayers();

    return <Box>
        {players.map((el) => <PlayerItem
            key={el.id}
            id={el.id}
            name={el.name}
            img={el.img}
            hp={el.hp}
            properties={el.properties}
            onSaveProps={onSaveProps}
        />)}
    </Box>;
};

export default observer(Players);

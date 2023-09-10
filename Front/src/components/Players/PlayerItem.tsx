import React from 'react';
import { Box } from '@chakra-ui/react';
import { Property } from '../../service/state';

type PlayersProps = {
    name: string
    hp: number
    img: string
    properties: Property[]
};

const PlayerItem: React.FC<PlayersProps> = (props) => {
    const { name, img, hp, properties } = props;

    return <Box>
        {name}
    </Box>;
};

export default PlayerItem;

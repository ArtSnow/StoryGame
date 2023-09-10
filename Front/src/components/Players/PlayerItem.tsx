import React, { useCallback, useState } from 'react';
import {
    Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Image, Progress,
} from '@chakra-ui/react';
import { Property } from '../../service/state';
import Properties from './Properties';

type PlayersProps = {
    id: string
    name: string
    hp: number
    img: string
    properties: Property[]
    onSaveProps?(id: string, props: Property[]): void
};

const PlayerItem: React.FC<PlayersProps> = (props) => {
    const { id, name, img, hp, properties, onSaveProps } = props;

    const [open, setOpen] = useState(false);

    const onClose = useCallback(() => setOpen(false), []);

    const onSave = useCallback((props: Property[]) => {
        if (typeof onSaveProps === 'function') {
            onSaveProps(id, props);
        }
    }, []);

    return <>
        <Box>
            {name}
        </Box>
        <Drawer
            isOpen={open}
            placement="right"
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent w="xl">
                <DrawerHeader>{name}</DrawerHeader>
                <DrawerBody>
                    <Image src={img} w="full" mt="4" />
                    <Progress value={hp} size="lg" colorScheme="red" />
                    <Properties
                        onSave={onSave}
                        properties={properties}
                        readOnly={typeof onSaveProps === 'function'}
                    />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>;
};

export default React.memo(PlayerItem);

import React, { useCallback, useState } from 'react';
import { Box, Button, IconButton, Input, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import { nanoid } from 'nanoid';
import { Property } from '../../service/state';

type PropertiesProps = {
    properties: Property[]
    readOnly: boolean
    onSave?: (properties: Property[]) => void
};

type ItemProps = {
    id: string
    content: string
    onChange: (id: string, value: string) => void
    onRemove: (id: string) => void
};

const Item = React.memo((props: ItemProps) => {
    const { id, content, onChange, onRemove } = props;

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        onChange(id, e.target.value);
    }, [onChange]);

    const onDelete = useCallback(() => onRemove(id), [id]);

    return <Box display="flex" alignItems="center">
        <Input
            value={content}
            onChange={onChangeHandler}
        />
        <IconButton
            ml="4"
            colorScheme="red"
            aria-label='Remove property'
            icon={<DeleteIcon />}
            onClick={onDelete}
        />
    </Box>
});

const Properties: React.FC<PropertiesProps> = (props) => {
    const { properties, readOnly } = props;

    const [localProps, setLocalProps] = useState<Property[]>(properties.map((el) => ({ ...el })));

    const onAdd = useCallback(() => {
        setLocalProps((prev) => [...prev, { id: nanoid(8), content: '' }]);
    }, []);

    const onChange = useCallback((id: string, value: string) => {
        setLocalProps((prev) => prev.map((el) => {
            if (el.id !== id) {
                return el;
            }

            return {
                id: el.id,
                content: value,
            };
        }));
    }, []);

    const onRemove = useCallback((id: string) => {
        setLocalProps((prev) => prev.filter((el) => el.id !== id));
    }, []);

    if (readOnly) {
        return <Box>
            {properties.map((el) => <Text key={el.id}>{el.content}</Text>)}
        </Box>;
    }

    return <Box>
        {localProps.map((el) => <Item
            key={el.id}
            id={el.id}
            content={el.content}
            onChange={onChange}
            onRemove={onRemove}
        />)}
        <Button onClick={onAdd} mt="8" colorScheme="teal" />
    </Box>;
};

export default Properties;

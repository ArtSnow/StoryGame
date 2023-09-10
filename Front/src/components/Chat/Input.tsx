import React, { useCallback, useState } from 'react';
import { Box, Button, Input as ChakraInput } from '@chakra-ui/react';

type InputProps = {
    onSendMessage(msg: string): void
};

const Input: React.FC<InputProps> = (props) => {
    const { onSendMessage } = props;

    const [value, setValue] = useState('');

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const onClickhandler = useCallback(() => {
        onSendMessage(value);
        setValue('');
    }, [value, onSendMessage]);

    return <Box display="flex" alignItems="center" mt="4">
        <ChakraInput
            w="xl"
            mr="4"
            value={value}
            onChange={onChangeHandler}
        />
        <Button colorScheme="teal" onClick={onClickhandler} size="lg" />
    </Box>
};

export default React.memo(Input);
import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Text } from '@chakra-ui/react';
import { MessageBody } from '../../ws/message';
import Input from './Input';

type ChatProps = {
    onSend?(message: string): void
    getMessages(): MessageBody[]
};

const Chat: React.FC<ChatProps> = (props) => {
    const { onSend, getMessages } = props;

    const messages = getMessages();

    const sortedMessages = useMemo(() => {
        const msgArray = messages.map((el) => ({ msg: el.msg, timestamp: el.timestamp }));
        msgArray.sort((a, b) => a.timestamp - b.timestamp);
        return msgArray;
    }, [messages]);

    return <Box bgColor="gray.100" w="xl" h="xl">
        {sortedMessages.map((el) => {
            return <Text key={`${el.msg}-${el.timestamp}`} mt="2">{el.msg}</Text>
        })}
        {typeof onSend === 'function' && <Input onSendMessage={onSend} />}
    </Box>;
};

export default observer(Chat);

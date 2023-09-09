import React, { useCallback, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/input';
import Paint from '../../components/Paint';
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { LoginStore } from './store';
import APIService from '../../service';

const LoginScreen: React.FC = () => {
    const loginStore = useRef(new LoginStore()).current;
    const canvas = useRef<HTMLCanvasElement>(null);

    const name = loginStore.getName();
    const password = loginStore.getPassword();

    const onNameChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        loginStore.setName(e.target.value);
    }, []);

    const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        loginStore.setPassword(e.target.value);
    }, []);

    const onLogin = useCallback(async () => {
        const image = canvas.current?.toDataURL('image/jpeg', 1);

        if (image) {
            APIService.makeRequest('/login', { name, password, image });
        }
    }, [name, password]);

    return <Box
        w="full"
        display="flex"
        flexDirection="column"
        alignItems="center"
    >
        <Box w="xl">
            <InputGroup size="lg" mt="24">
                <InputLeftAddon bgColor="blue.600" borderColor="blue.600" color="white">Имя</InputLeftAddon>
                <Input
                    value={name}
                    onChange={onNameChange}
                />
            </InputGroup>
            <InputGroup size="lg" mb="16" mt="6">
                <InputLeftAddon bgColor="blue.600" borderColor="blue.600" color="white">Пароль</InputLeftAddon>
                <Input
                    value={password}
                    onChange={onPasswordChange}
                />
            </InputGroup>
        </Box>
        <Paint width={600} height={400} ref={canvas} />
        <Button
            size="lg"
            mt="16"
            colorScheme="teal"
            onClick={onLogin}
        >
            Погнали
        </Button>
    </Box>;
};

export default observer(LoginScreen);

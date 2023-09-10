import React, { useCallback, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Paint from '../../components/Paint';
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { LoginStore } from './store';
import Input from './Input';
import { useToast } from '@chakra-ui/react';
import { createErrorToast } from '../../utils';
import { Role } from '../../service/login';

type LoginScreenProps = {
    join(props: { password: string, id: string, role: Role }): void
};

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
    const { join } = props;

    const loginStore = useRef(new LoginStore()).current;
    const canvas = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const onLogin = useCallback(async () => {
        const image = canvas.current?.toDataURL('image/jpeg', 1);

        if (image) {
            setLoading(true);
            const data = await loginStore.login(image);

            if ('error' in data) {
                toast(createErrorToast(data.error));
            } else {
                join({
                    id: 'test',
                    password: data.password,
                    role: data.role,
                });
            }
            setLoading(false);
        }
    }, []);

    return <Box
        w="full"
        display="flex"
        flexDirection="column"
        alignItems="center"
    >
        <Box w="xl" mt="24" mb="10">
            <Input getValue={loginStore.getName} onChange={loginStore.setName} label="Имя" />
            <Input getValue={loginStore.getPassword} onChange={loginStore.setPassword} label="Пароль" />
        </Box>
        <Paint width={600} height={400} ref={canvas} />
        <Button
            size="lg"
            mt="16"
            colorScheme="teal"
            onClick={onLogin}
            isLoading={loading}
        >
            Погнали
        </Button>
    </Box>;
};

export default observer(LoginScreen);

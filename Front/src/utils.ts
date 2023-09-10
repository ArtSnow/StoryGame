import { UseToastOptions } from '@chakra-ui/react';

export function createErrorToast(error: string): UseToastOptions {
    return {
        title: 'Error',
        description: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
    };
}

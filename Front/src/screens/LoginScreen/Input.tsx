import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Input as ChakraInput, InputLeftAddon, InputGroup } from '@chakra-ui/react';

type InputProps = {
    getValue(): string
    onChange(value: string): void
    label: string
};

const Input: React.FC<InputProps> = (props) => {
    const { getValue, onChange, label } = props;

    const value = getValue();

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        onChange(e.target.value);
    }, [onChange]);

    return <InputGroup size="lg" mb="6">
        <InputLeftAddon bgColor="blue.600" borderColor="blue.600" color="white">
            {label}
        </InputLeftAddon>
        <ChakraInput
            value={value}
            onChange={onChangeHandler}
        />
    </InputGroup>;
};

export default observer(Input);
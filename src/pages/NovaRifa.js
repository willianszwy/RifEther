import { Form, FormField, TextInput, Button, Box, Select, Spinner, Heading, Notification } from "grommet";
import React from "react";
import useContractRifaFactory from "../hooks/useContractRifaFactory";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NovaRifa = () => {
    const [loading, setLoading] = useState(false);

    const constractRifaFactory = useContractRifaFactory();
    const { account } = useWeb3React();
    const [quantidade, setQuantidade] = React.useState('50');
    const navigate = useNavigate();

    const handleFormSubmit = (formData, qtd) => {
        setLoading(true);

        constractRifaFactory.methods
            .createRifa(account, formData.nome, formData.premio, formData.valor, qtd)
            .send({ from: account, value: formData.premio })
            .then(response => {
                setLoading(false);
                navigate('/');
            });
    };

    return (
        <Box align="center" pad="small">
            {loading ? (<Box height="small" >
                <Spinner size="large" />
            </Box>) : (<></>)}

            <Heading level={2} margin="none">Criar Rifa</Heading>
            <Box fill pad="medium">
                <Form onSubmit={({ value }) => { handleFormSubmit(value, quantidade) }}>
                    
                    <FormField name="nome" htmlFor="nome" label="Nome" re>
                        <TextInput 
                            id="nome" 
                            name="nome" 
                            placeholder="Nome da Rifa" 
                            required
                            validate={{ regexp: /^[a-z]/i }}/>
                    </FormField>

                    <FormField name="premio" htmlFor="premio" label="Premio">
                        <TextInput type="number" min="1" id="premio" name="premio" placeholder="Valor do Premio" required />
                    </FormField>

                    <FormField name="valor" htmlFor="valor" label="Valor">
                        <TextInput type="number" min="1" id="valor" name="valor" placeholder="Valor do bilhete" required/>
                    </FormField>
                    <FormField name="quantidade" htmlFor="textinput-id" label="Quantidade">
                        <Select
                            label=""
                            required
                            options={['5', '10', '15', '20', '25', '50', '100']}
                            value={quantidade}
                            onChange={({ option }) => setQuantidade(option)}
                        />
                    </FormField>


                    <Box flex justify="end" direction="row" gap="medium">
                        <Button type="submit" primary fill size="large" margin={{ top: "medium" }} label="Criar" />
                    </Box>
                </Form>

            </Box>

        </Box>
    )
};

export default NovaRifa;
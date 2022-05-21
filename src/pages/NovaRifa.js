import { Form, FormField, TextInput, Button, Box, Select } from "grommet";
import React from "react";

const NovaRifa = () => {
    const [quantidade, setQuantidade] = React.useState('50');
    return (
        <Form onSubmit={({ value }) => { }}>
            <FormField name="nome" htmlFor="nome" label="Nome">
                <TextInput id="nome" name="nome" placeholder="Nome da Rifa" />
            </FormField>

            <FormField name="premio" htmlFor="premio" label="Premio">
                <TextInput id="premio" name="premio" placeholder="Valor do Premio" />
            </FormField>

            <FormField name="valor" htmlFor="valor" label="Valor">
                <TextInput id="valor" name="valor" placeholder="Valor do bilhete" />
            </FormField>
            <FormField name="quantidade" htmlFor="textinput-id" label="Quantidade">
            <Select
               label=""
                options={['10', '50', '100']}
                value={quantidade}
                onChange={({ option }) => setQuantidade(option)}
            />
            </FormField>
            

            <Box flex justify="end" direction="row" gap="medium">
                <Button type="submit" primary label="Criar" />
            </Box>
        </Form>
    )
};

export default NovaRifa;
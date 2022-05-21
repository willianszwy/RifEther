import { Heading, Box, Text } from "grommet";
import GridRifa from "../components/GridRifa";

const rifa = { nome: "Rifa Bicicleta BarraForte", valor: "0,0001", quantidade: 50, premio: 0.334 }

const Rifa = () => {
    return (
        <Box fill>
            <Box pad='small'>
                <Box flex direction="row-responsive" align="baseline" justify="between">
                    <Heading level={2} >{rifa.nome}</Heading>
                    <Text size="50px" weight="bold" color="brand">
                        Prêmio: {rifa.premio}
                    </Text>
                </Box>
                <Text size="xlarge" weight="bold" textAlign="end">
                    Valor: {rifa.valor}
                </Text>
            </Box>
            <Box>
                <Text size="xxlarge" weight="bold" textAlign="center">
                    Números
                </Text>
                <Box margin={{top: 'medium'}}>
                    <GridRifa></GridRifa>
                </Box>
            </Box>
        </Box>

    )
};

export default Rifa;
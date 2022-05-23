import { Heading, Box, Text, Button } from "grommet";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import GridRifa from "../components/GridRifa";
import useContractRifa from "../hooks/useContractRifa";
import { useWeb3React } from "@web3-react/core";
import { Achievement } from 'grommet-icons';


const rifa = { nome: "Rifa Bicicleta BarraForte", valor: "0,0001", quantidade: 50, premio: 0.334 }

const Rifa = () => {

    const params = useParams();
    const [rifa, setRifa] = useState({});
    const [data, setData] = useState([]);
    const [finalizar, setFinalizar] = useState(false);
    const [criador, setCriador] = useState('');
    const [reload, setReload] = useState(false);
    const [ganhador, setGanhador] = useState('');
    const contractRifa = useContractRifa(params['id']);
    const { account } = useWeb3React();

   
    const getRifa = useCallback(async () => {
        if (contractRifa) {
            const nome = await contractRifa.methods.nome().call();
            const premio = await contractRifa.methods.premio().call();
            const valor = await contractRifa.methods.valor().call();
            const bilhetes = await contractRifa.methods.getBilhetes().call();
            const numerosRestantes = await contractRifa.methods.bilhetesRestantes().call();

            setCriador(await contractRifa.methods.criador().call());

            setGanhador(await contractRifa.methods.vencedor().call());

            setRifa({ nome, premio, valor });

            setFinalizar(+numerosRestantes === 0);

            let temp = [];
            bilhetes.forEach((value, index) => {
                temp.push({
                    numero: index,
                    status: (value === '0x0000000000000000000000000000000000000000' ? true : false),
                    comprador: value,
                    loading: false
                });
            });
            setData(temp);

        }
    }, [contractRifa]);

    useEffect(() => {
        getRifa();
    }, [getRifa]);

    useEffect(() => {
        getRifa();
    }, [reload]);

    const realizarSorteio = () => {
        contractRifa.methods
            .sorteio()
            .send({ from: account })
            .then(response => {
                setReload(old => !old);
            });
    }

    const loading = (index) => {
        setData(old =>
            old.map(item => {
                if (item.numero === index) {
                    return { ...item, loading: !item.loading };
                }
                return item;
            })
        );
    }

    const comprar = (index) => {
        loading(index, true);
        contractRifa.methods
            .comprarNumero(account, index)
            .send({ from: account, value: rifa.valor })
            .then(response => {
                loading(index, false);
                setReload(old => !old);
            });
    };

    return (
        <Box fill>
            {finalizar ? (
                <Box flex direction="row-responsive" align="center" justify="center">
                    {ganhador === '0x0000000000000000000000000000000000000000' && account === criador ?
                        (<Button label="Sortear" onClick={() => realizarSorteio()} size="large" icon={<Achievement />} />) 
                      : (<Box>
                            <Heading level={3} margin="none" >Ganhador</Heading>
                            {ganhador === '0x0000000000000000000000000000000000000000' ? (
                                <Text color='brand'>Sorteio ainda não realizado</Text>
                            ): (
                                <Text color='brand'>{ganhador}</Text>
                            )}
                            
                        </Box>)}
                </Box>) 
                : (<></>)}

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
                <Box margin={{ top: 'medium' }}>
                    <GridRifa data={data} comprar={(index) => comprar(index)}></GridRifa>
                </Box>
            </Box>
        </Box>

    )
};

export default Rifa;
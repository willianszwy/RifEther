import { useWeb3React } from "@web3-react/core";
import { List, Box, Button } from "grommet";
import { AddCircle } from 'grommet-icons';
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useContractRifaFactory from "../hooks/useContractRifaFactory";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const constractRifaFactory = useContractRifaFactory();
  const [rifas, setRifas] = useState([]);
  const navigate = useNavigate();

  
  const getRifas = useCallback(async () => {
    if (constractRifaFactory) {
      const result = await constractRifaFactory.methods.getRifas().call();
      
      let temp = [];
      result.forEach((value, index) => {
        temp.push({id: value['id'],nome: value['name'],total: value['count'], contrato: value['contrato']});
      });

      setRifas(temp);
    }
  }, [constractRifaFactory]);

  useEffect(() => {
    getRifas();
  }, [getRifas]);

  return (
    <Box gap="small">
      <Box align="end">
        <Link to="/create" >
          <Button label="Nova Rifa" icon={<AddCircle />} />
        </Link>
      </Box>
      <List
        fill='horizontal'
        primaryKey="nome"
        secondaryKey="total"
        itemKey="id"
        data={rifas}
        onClickItem={({item, index}) => { navigate(`/rifa/${item.contrato}`);}}
      />
    </Box>
  )
};

export default Home;
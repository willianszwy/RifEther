import {  Link, Outlet } from "react-router-dom";
import { Box, Button, Heading, Grommet, Anchor, Text } from 'grommet';
import { Sign,Logout } from 'grommet-icons';
import AppBar from "../AppBar";

import { useWeb3React } from "@web3-react/core";
import { injected } from "../Wallet/Connectors";

const theme = {
    global: {
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px',
        },
    },
};


const Layout = () => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    async function connect() {
        try {
          await activate(injected)
        } catch (ex) {
          console.log(ex)
        }
      }
    
      async function disconnect() {
        try {
          deactivate()
        } catch (ex) {
          console.log(ex)
        }
      }

    return (
        <Grommet theme={theme}>
            <Box fill pad='large'>
                <AppBar>
                    <Anchor as={Link} to='/' level='3' margin='none'>
                        <Heading level='3' margin='none'>RIFETHER</Heading>
                    </Anchor>
                    {active ? (<Text>Account: {account}</Text>) : ''}
                    {active ? (<Button  label="Desconectar" icon={<Logout />} onClick={disconnect}  />  ) : (<Button  label="Conectar Metamask" icon={<Sign />} onClick={connect}  />  )}                    
                                    
                </AppBar>
                <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                    <Box flex background='light-2' pad='medium'>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </Grommet>
    )
}

export default Layout;
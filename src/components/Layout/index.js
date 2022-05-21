import {  Link, Outlet } from "react-router-dom";
import { Box, Button, Heading, Grommet, Anchor } from 'grommet';
import { Sign } from 'grommet-icons';
import AppBar from "../AppBar";

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
    return (
        <Grommet theme={theme}>
            <Box fill pad='large'>
                <AppBar>
                    <Anchor as={Link} to='/' level='3' margin='none'>
                        <Heading level='3' margin='none'>RifEther</Heading>
                    </Anchor>
                    
                    <Button  label="Conectar Metamask" icon={<Sign />}   />                  
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
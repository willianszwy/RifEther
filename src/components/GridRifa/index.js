import { Box, Spinner, Text, Stack, Tip } from "grommet";
import { Bitcoin } from "grommet-icons";


const GridRifa = (props) => {
    
    return (
        <Box fill direction="row" wrap={true} align='center' justify="center">
            {props.data.map((item, index) => (
                <Stack anchor={item.status ? "center" : "top-right"} key={index}>
                    <Box round='full'
                        height='xsmall'
                        width="xsmall"
                        background={item.status ? 'brand' : 'status-disabled'}
                        margin='xsmall'
                        align='center'
                        justify="center"
                        elevation="small"
                        hoverIndicator={{ "color": "neutral-2" }}
                        
                        onClick={() => item.status ? props.comprar(index) : null}
                    >
                        <Text textAlign="center">{item.numero}</Text>
                    </Box> 
                    {item.loading? (
                    <Box fill>
                        <Spinner size="xlarge" color="accent-1" />  
                    </Box>) : !item.status ? (
                        <Tip content={item.comprador} dropProps={{background: 'light-2', pad:'xsmall', round:'small'}} plain>
                            <Bitcoin size="35px" color="brand" />
                        </Tip>
                        
                    ) : (<></>) }               
                                      
                </Stack>
            ))}
        </Box>

    )
}

export default GridRifa;
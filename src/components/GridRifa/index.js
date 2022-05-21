import { Box, Text } from "grommet";

const numeros = [
    {numero: 1, status: true},
    {numero: 2, status: true},
    {numero: 3, status: true},
    {numero: 4, status: true},
    {numero: 5, status: true},
    {numero: 6, status: true},
    {numero: 7, status: true},
    {numero: 8, status: true},
    {numero: 9, status: true},
    {numero: 10, status: true},
    {numero: 11, status: true},
    {numero: 12, status: true},
    {numero: 13, status: false},
    {numero: 14, status: true},
    {numero: 15, status: true},
    {numero: 16, status: true},
    {numero: 17, status: true},
    {numero: 18, status: true},
    {numero: 19, status: true},
    {numero: 20, status: true},
    {numero: 21, status: true},
    {numero: 22, status: true},
    {numero: 23, status: true},
    {numero: 24, status: true},
    {numero: 25, status: true},
    {numero: 26, status: false},
    {numero: 27, status: false},
    {numero: 28, status: true},
    {numero: 29, status: true},
    {numero: 30, status: true},
    {numero: 31, status: true},
    {numero: 32, status: true},
    {numero: 33, status: true},
    {numero: 34, status: true},
    {numero: 35, status: true},
    {numero: 36, status: true},
    {numero: 37, status: true},
    {numero: 38, status: true},
    {numero: 39, status: true},
    {numero: 40, status: true},
    {numero: 41, status: true},
    {numero: 42, status: true},
    {numero: 43, status: true},
    {numero: 44, status: true},
    {numero: 45, status: true},
    {numero: 46, status: false},
    {numero: 47, status: true},
    {numero: 48, status: true},
    {numero: 49, status: true},
    {numero: 50, status: true},
    
    
];

const GridRifa = () => {
    return (
        <Box fill direction="row" wrap={true} align='center' justify="center">
            {numeros.map((item, index) => (
               <Box round='full' 
                    height='xsmall' 
                    width="xsmall"  
                    background={item.status? 'brand' : 'status-disabled'} 
                    margin='xsmall' 
                    align='center' 
                    justify="center"
                    elevation="small"
                    hoverIndicator={{"color":"neutral-2"}}
                    key={index}
                    onClick={()=>{}}
                >                   
                   <Text textAlign="center">{item.numero}</Text>
                </Box>     
            ))}
        </Box>
        
    )
}

export default GridRifa;
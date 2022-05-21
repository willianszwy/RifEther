import { List, Box, Button } from "grommet";
import { AddCircle } from 'grommet-icons';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box gap="small">
      <Box align="end">
        <Link to="/create" >
          <Button label="Nova Rifa" icon={<AddCircle />} />
        </Link>
      </Box>
      <List
        fill='horizontal'
        primaryKey="name"
        secondaryKey="percent"
        data={[
          { name: 'Alan Turing', percent: 20 },
          { name: 'Bryan', percent: 30 },
          { name: 'Chris', percent: 40 },
          { name: 'Eric', percent: 80 },
        ]}
      />
    </Box>
  )
};

export default Home;
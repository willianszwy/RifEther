import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { abi_rifa_factory, rifa_factory_address } from '../../contracts/abi';

const useContractRifaFactory = () => {
    const { active, library } = useWeb3React();

    const contract = useMemo(() => {
        if(active) return new library.eth.Contract(abi_rifa_factory, rifa_factory_address);
    }, [active, library?.eth?.Contract]);
    return contract;
};

export default useContractRifaFactory;
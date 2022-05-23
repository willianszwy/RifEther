import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { abi_rifa } from '../../contracts/abi';

const useContractRifa = (address_rifa) => {
    const { active, library } = useWeb3React();
    const contract = useMemo(() => {
        if(active) return new library.eth.Contract(abi_rifa, address_rifa);
    }, [active, library?.eth?.Contract]);
    return contract;
};

export default useContractRifa;
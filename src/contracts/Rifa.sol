//SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

contract RandomNumbers{
    function random(uint number) public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender))) % number;
    }
} 


contract RifaFactory {
    uint rifaCount = 0;
    Rifa[] public rifas;

    struct RifaView {
        uint id;
        string name;
        uint256 count; 
        address contrato;       
    }

    function createRifa(address _criador, string memory _nome, uint256 _premio, uint256 _valor, uint _quantidade) public payable {
        require(msg.value >= _premio, "Valor paga deve ser igual ao premio");
        rifaCount++;
        rifas.push((new Rifa){value: msg.value}(_criador, _nome, _premio, _valor, _quantidade));
    }

    function getRifas() public view returns( RifaView[] memory) {
        RifaView[] memory rifasList = new RifaView[](rifas.length);

        for(uint i = 0; i < rifas.length; i++) {
            rifasList[i] = RifaView(i,rifas[i].nome(), rifas[i].bilhetesRestantes(), address(rifas[i]));
        }

        return rifasList;
    }
}


contract Rifa {

    address public criador;
    string public  nome;
    uint256 public premio;
    uint256 public valor;
    uint public quantidade;

    address public vencedor;
    
    address[] public bilhetes;

    constructor(address _criador, string memory _nome, uint256 _premio, uint256 _valor, uint _quantidade)  payable {
        require(msg.value == _premio, "Pagamento deve ser igual ao premio");        
        criador = _criador;
        nome = _nome;
        premio = _premio;
        valor = _valor;
        quantidade = _quantidade;

        for(uint i = 0; i < quantidade; i++) {
            bilhetes.push(address(0));
        }
    } 

    function comprarNumero(address _comprador, uint _numero) public payable {
        require(msg.value == valor, "Valor invalido");
        require(_numero < quantidade, "Numero invalido");
        require(bilhetes.length >= quantidade, "Rifa ja esta completa");
        require(bilhetes[_numero] == address(0), "Numero ja escolhido");
        require(_numero >= 0, "Numero invalido");
        require(vencedor == address(0), "Rifa ja finalizada");

        bilhetes[_numero] = _comprador;
    }

    function getAddress(uint _indice) public view returns(address) {
        return bilhetes[_indice];
    }

    function sorteio() public {
        require(criador == msg.sender, "Somente o criador pode sortear");
        require(vencedor == address(0), "Rifa ja finalizada");
        
        RandomNumbers random = new RandomNumbers();

        uint randomNum = random.random(bilhetes.length);

        vencedor = bilhetes[randomNum];

        (bool success, ) = (vencedor).call{value: premio}(""); 
        require(success, "Falha ao transferir dinheiro do premio");

        (bool success2, ) = (criador).call{value: address(this).balance}(""); 
        require(success2, "Falha ao transferir dinheiro do criador");

        delete bilhetes;

    }

    function getBilhetes() public view returns( address[] memory) {
        return bilhetes;
    }

    function bilhetesRestantes() public view returns (uint) {
        uint256 count = 0;
        for(uint i = 0; i < quantidade; i++) {
            if(bilhetes[i] != address(0)){
                count++;
            } 
        }
        return quantidade - count;
    }

}
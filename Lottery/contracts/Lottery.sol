pragma solidity ^0.5.0;

contract Lottery{
    address public manager;
    address payable[] public players;
    
    constructor() public{
        manager = msg.sender;
    }

    function enter() public payable{
        require(msg.value > 0.001 ether,"Please send at least 0.001 ether to enter in contest.");
        players.push(msg.sender);
    }

    function getAllPlayers() public view returns(address payable[] memory){
        return players;
    }

    function random() public view returns(uint){
       return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)));
    }

    function pickWinner() public restricted{
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }

    function getLotteryBalance() public restricted view returns(uint){
        return uint(address(this).balance);
    }

    modifier restricted(){
        require(msg.sender == manager,"Only Managers can access");
        _;
    }
}
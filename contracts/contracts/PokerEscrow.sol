// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PokerEscrow {
    struct AgentBalance {
        uint256 available;
        uint256 locked;
    }

    mapping(address => AgentBalance) private agentBalances;
    address public owner;

    event Deposited(address indexed agent, uint256 amount);
    event Locked(address indexed agent, uint256 amount);
    event Released(address indexed agent, uint256 amount);
    event Withdrawn(address indexed agent, uint256 amount, address to);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function deposit(address agent) external payable {
        agentBalances[agent].available += msg.value;
        emit Deposited(agent, msg.value);
    }

    function lock(address agent, uint256 amount) external onlyOwner {
        AgentBalance storage bal = agentBalances[agent];
        require(bal.available >= amount, "Insufficient available");
        bal.available -= amount;
        bal.locked += amount;
        emit Locked(agent, amount);
    }

    function release(address agent, uint256 amount) external onlyOwner {
        AgentBalance storage bal = agentBalances[agent];
        require(bal.locked >= amount, "Insufficient locked");
        bal.locked -= amount;
        bal.available += amount;
        emit Released(agent, amount);
    }

    function withdraw(uint256 amount, address payable to) external {
        AgentBalance storage bal = agentBalances[msg.sender];
        require(bal.available >= amount, "Insufficient available");
        bal.available -= amount;
        to.transfer(amount);
        emit Withdrawn(msg.sender, amount, to);
    }

    function getBalance(address agent) external view returns (uint256 available, uint256 locked) {
        AgentBalance storage bal = agentBalances[agent];
        return (bal.available, bal.locked);
    }
}

pragma solidity ^0.5.0;

contract Basic {
    uint public x = 0;

    function getX() public view returns(uint) {
        return x;
    }

    function setX(uint _x) public {
        x = _x;
    }
}
pragma solidity ^0.5.0;

contract Flip {
    bool public value;

    function flip() public {
        if (value) {
            value = false;
        } else {
            value = true;
        }
    }

    function get() public view returns (bool) {
        return value;
    }
}

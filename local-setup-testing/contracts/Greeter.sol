//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.11;

contract Greeter {
    string private greeting;

    event GreetUpdated(address sender, string message);

    error RevertError(address sender);

    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        require(bytes(_greeting).length > 0, "Message can not be empty");
        greeting = _greeting;
        emit GreetUpdated(msg.sender, _greeting);
    }

    function revertMethod() public view {
        revert RevertError(msg.sender);
    }
}

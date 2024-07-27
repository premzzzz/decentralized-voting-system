// SPDX-License-Identifier: MIT 
// contracts/Voting.sol
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    function addCandidate(string memory _name) public {
        candidates[candidatesCount] = Candidate(_name, 0);
        candidatesCount++;
    }

    function vote(uint _candidateId) public {
        candidates[_candidateId].voteCount++;
    }

    function getCandidatesCount() public view returns (uint) {
        return candidatesCount;
    }

    function getCandidate(uint _candidateId) public view returns (string memory, uint) {
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.name, candidate.voteCount);
    }
}

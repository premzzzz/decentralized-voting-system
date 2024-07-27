const contractAddress = 0xf8e81D47203A594245E36C48e151709F0C19fBe8; // Replace with your deployed contract address
const abi = [ [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "candidatesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "getCandidate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] ];

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const contract = new web3.eth.Contract(abi, contractAddress);

    async function loadCandidates() {
        try {
            const candidatesCount = await contract.methods.getCandidatesCount().call();
            const content = document.getElementById('content');
            content.innerHTML = '';

            for (let i = 0; i < candidatesCount; i++) {
                const candidate = await contract.methods.getCandidate(i).call();
                content.innerHTML += `<div class="candidate">${candidate[0]} - Votes: ${candidate[1]}</div>`;
            }
        } catch (error) {
            console.error("Error loading candidates:", error);
        }
    }

    loadCandidates();

    document.getElementById('addCandidateForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const candidateName = document.getElementById('candidateName').value;

        try {
            const accounts = await web3.eth.getAccounts();
            await contract.methods.addCandidate(candidateName).send({ from: accounts[0] });
            loadCandidates(); // Reload candidates to reflect the new addition
        } catch (error) {
            console.error("Error adding candidate:", error);
        }
    });
});



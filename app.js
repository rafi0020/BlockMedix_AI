// Connect to the blockchain
const Web3 = window.Web3;
const ganacheUrl = "http://127.0.0.1:7545";
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));

// Contract details
const contractAddress = "0xYourContractAddressHere"; // Replace with your deployed contract address
const contractAbi = [
  // Add your contract ABI here
];

const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Add record to the blockchain
document.getElementById("add-record-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const name = document.getElementById("name").value;
  const data = document.getElementById("data").value;

  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.addRecord(name, data).send({ from: accounts[0] });
    alert("Record added successfully!");
  } catch (error) {
    console.error("Error adding record:", error);
    alert("Failed to add record.");
  }
});

// Retrieve and analyze record
document.getElementById("analyze-record-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const recordId = document.getElementById("record-id").value;

  try {
    const record = await contract.methods.getRecord(recordId).call();
    const name = record[0];
    const healthData = record[1];

    // Perform simple analysis (e.g., word count)
    const wordCount = healthData.split(" ").length;

    document.getElementById("record-result").innerHTML = `
      <h3>Record Details</h3>
      <p><strong>Patient Name:</strong> ${name}</p>
      <p><strong>Health Data:</strong> ${healthData}</p>
      <p><strong>Word Count:</strong> ${wordCount}</p>
    `;
  } catch (error) {
    console.error("Error retrieving record:", error);
    alert("Failed to retrieve record.");
  }
});

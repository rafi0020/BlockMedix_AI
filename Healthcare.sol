// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Healthcare {
    struct PatientRecord {
        string name;
        string healthData; // Encrypted health data (e.g., medical notes)
        address owner;     // Patient's address
    }

    mapping(uint => PatientRecord) public records; // Record ID to PatientRecord
    uint public recordCount;

    // Event for new records
    event RecordAdded(uint recordId, address owner);

    // Add a new patient record
    function addRecord(string memory _name, string memory _healthData) public {
        recordCount++;
        records[recordCount] = PatientRecord(_name, _healthData, msg.sender);
        emit RecordAdded(recordCount, msg.sender);
    }

    // Get record details
    function getRecord(uint _recordId) public view returns (string memory, string memory, address) {
        require(_recordId > 0 && _recordId <= recordCount, "Invalid record ID");
        PatientRecord memory record = records[_recordId];
        return (record.name, record.healthData, record.owner);
    }
}

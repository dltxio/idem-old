# Blockchain ID
Using EIP 820 for ID claims

## Overview
Everytime an exchange calls an ID provider to KYC documents, they incure an expense.  Futhermore, users are required every time provide KYC information, instead of a portable verification.

## How it works

### Claims based ID



## Trusted ID verification providers

A smart contract contains a stuct of trusted providers.  The providers can only be granted or revoked by an independent third party, such as Blockchain Australia.

1812 Example

```
struct ID {
	address issuer;
	address subject;
	uint256 validFrom;
	uint256 validTo;
}
```

Issuer: The ID provider.  This could be Blockchain Australia
Subject:  See table


| Key | Document | Details
| --- | --- | ---
| 0x00 | Australian birth certificate | A full birth certificate in your name or former name issued by Births, Deaths and Marriages. We can’t accept birth extracts or birth cards.
| 0x01 | Australian driver licence | A current driver licence with your photo issued in your name. This includes physical and digital driver licences, current learner permits and provisional licences. 


780 Example
```
contract EthereumClaimsRegistry {

    mapping(address => mapping(address => mapping(bytes32 => bytes32))) public registry;

    event ClaimSet(
        address indexed issuer,
        address indexed subject,
        bytes32 indexed key,
        bytes32 value,
        uint updatedAt);

    event ClaimRemoved(
        address indexed issuer,
        address indexed subject,
        bytes32 indexed key,
        uint removedAt);

    // create or update clams
    function setClaim(address subject, bytes32 key, bytes32 value) public {
        registry[msg.sender][subject][key] = value;
        emit ClaimSet(msg.sender, subject, key, value, now);
    }

    function setSelfClaim(bytes32 key, bytes32 value) public {
        setClaim(msg.sender, key, value);
    }

    function getClaim(address issuer, address subject, bytes32 key) public view returns(bytes32) {
        return registry[issuer][subject][key];
    }

    function removeClaim(address issuer, address subject, bytes32 key) public {
        require(msg.sender == issuer);
        delete registry[issuer][subject][key];
        emit ClaimRemoved(msg.sender, subject, key, now);
    }
}
```

## JWTs


## References
https://www.servicesaustralia.gov.au/individuals/topics/confirm-your-identity/29166

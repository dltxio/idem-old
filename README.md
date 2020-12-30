# Blockchain ID

Using EIP 1820 for ID claims.

## Overview

Everytime an exchange calls an ID provider to KYC documents, they incure an expense.  Futhermore, users are required every time provide KYC information instead of a portable verification.  By locally storing users information verified information, we can increase the customer onboarding expirence and reduce the costs to the exchanges and other services.

## Process

### Step 1: New registration

User onboards to the app via Email or Mobile number.

### Step 2: Create new Key Pair
The a private / public key pair is created on the device, using the ECDSA256spk algorithim.  This will be used to sign messages to third parties.

Note: PGP/GPG should not be ruled out.

### Step 3: User adds their data

On the mobile application or site the new can choose certain types of claims that which to verify, such as Data of Birth, Address etc.  This information is stored on the mobile device.  These are claims with a specific taxonomy defined below.

### Step 4:

A user makes a claim that is substantiated with supporting evidence such as a government issued document, utilities bill or such.   These claims are then verified by a third party, who returns a signed JSON object that can the be used again.

1. Submit your claim with supporting documentation 
2. Block ID then verifies this information with a to a trusted provider signed with an ETH public / private key pair and X-059 SSL certificate
2. Add documents to the contract as a claim
3. Authenticate with compatible services

### Step 5:  Onboarding on Third Party Sites

1. Hash
2. Sign
3. Share

## Appendix

### Registration Schema
When Block ID ..


### Claims based ID

List of claims

| Key | Subject | Format | Description |
|---|---|---|---|
| 0x00 | Full Name |  | Clients Full Name |
| 0x01 | Birth Year | YYYY | ISO 8601 |
| 0x02 | Date of Birth | YYYY-MM-DD | ISO 8601 |

### Trusted ID verification providers

A smart contract contains a struct of trusted providers.  The providers can only be granted or revoked by an independent third party, such as Blockchain Australia, DataZoo etc.

### ERC 1812 Example

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


### ERC 780 Example
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

    // create or update claims
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

# Verfication

Once the user has verified their identity, a third party service such as a crypto exchange may want to verifiy their users identity.  Put simply, "is this person who they say they are?"

## JWTs


## References
https://www.servicesaustralia.gov.au/individuals/topics/confirm-your-identity/29166

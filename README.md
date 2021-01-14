# Idem

Using EIP 1820 for ID claims.

## Abstract

This paper defines a protocol using standard cryptography and reputable KYC providers to assert claims such as Proof of Age, for the re-use at online websites that require KYC.

Everytime an exchange calls an ID provider to KYC documents, they incure an expense.  Futhermore, users are required every time provide KYC information instead of a portable verification.  By locally storing users information verified information, we can increase the customer onboarding expirence and reduce the costs to the exchanges and other services.

## User onboarding

The following defines the work flow for a new users to use the id app.

### Step 1: New registration

User onboards to the app via their Mobile number.

### Step 2: New private key
The app will automatically create a 256 bit private key will be created on the device.  This will be used to sign messages to third parties.

Note: PGP/GPG should not be ruled out.

### Step 3: Upload data

On the mobile application the user can choose certain types of claims that which to verify, such as Data of Birth or Address.  The user is then required to substantiated any of those claims with supporting evidence such as a government issued document, utilities bill or such. The documents are stored in the local storage of the device along with a keccak 256 hash.

Meta data is stored in a JSON object

```json
[
	claims: [
		key: "0x02",
		type: "dob",
		value: 1979-04-29
	]
]
```

## Verify these claims
These claims are then verified by a third party KYC vendors who return an X-509 SSL certificate signed JSON object that can the be used again.  Each vendor has a different process

Table of vendors

## Implmentation on third party sites
### Step 1:  Onboarding on Third Party Sites

The exchange creates a unique URL with the mime `id://` with the claims the exchange requires for 

* Call back URL (mandatory)
* Nonce as UUID (mandatory)
* A list of claims required

Eg: `id://callback=myexchange.com.au/register?nonce=8b5c66c0-bceb-40b4-b099-d31b127bf7b3`

### Step 2:  Posting the signed data
The user will then receive confirmation alert on the ...

```json

```

## Appendix

### Registration Schema
When Block ID ..


### Claims based ID

Table of claims

| Key | Subject | Mnemonic | Standard | Description |
|---|---|---|---|---|
| 0x00 | Full Name | fullname | | Clients Full Name |
| 0x01 | Birth Year | birthyear | YYYY ISO 8601 | Clients Year of Birth |
| 0x02 | Date of Birth | dob | YYYY-MM-DD ISO 8601 | Clients Date of Birth | 

Table of documents

| Key | Document | Details
| --- | --- | ---
| 0x00 | Australian birth certificate | A full birth certificate in your name or former name issued by Births, Deaths and Marriages. We can’t accept birth extracts or birth cards.
| 0x01 | Australian driver licence | A current driver licence with your photo issued in your name. This includes physical and digital driver licences, current learner permits and provisional licences. 

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

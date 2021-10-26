# Idem 
https://idem.com.au

## Abstract

Idem is an open source cross platform mobile application based on the Decentralised Identity Foundations DID protocol. The mobile application will give individuals control of their digital identities by establishing trust in an interaction between two individuals or entities that do not know each other. For trust to happen, the offering party will present credentials to the receiving parties, which can verify that the credentials are from an issuer that they trust.

Each time an exchange requests an ID from a new user, the KYC provider charges the exchange a fee. Users are required to provide KYC information and have it verified for each and every exchange onboarding instead of being able to reuse verification from a trusted provider. By locally storing user's verified information with a cryptographic signature, we can enhance the customer onboarding experience and reduce costs incurred by vendors.

## The Tech
Idem uses a number of cryptographic protocols to sign and encrypt your data. PGP/GPG encryption is used to securely store data on your device, while the Ethereum elliptic curve (ECDSA) is used to sign claims which conforms to the DID foundations verifiable claims schema. Specifically, anyone can verify that the transaction is valid. The verification doesn't involve the users private key and is never known by Idem.

## Intent
Idem is designed to be used by third parties, such as crypto exchanges, in two ways: 

1. Onboarding / Registering new users who do not have an account on the third party platform (User Story 1)
2. Onboarded users who have not completed any verification (User Story 2)

## Creating a profile on your Idem app

### Step 1: New Idem registration
User creates a new local account on their mobile device using the Idem app, using their email address or phone number as a unique identifier.

### Step 2: New private key
The app will automatically create a 256-bit private key on the device or allow users to import a mnemonic seed phrase based on the bitcoin BIP39 standard. This will be used to sign and verify requests using ECDSA to third parties.

### Step 3: Upload data
On the mobile app users can choose certain types of claims to verify such as 18+, Date of Birth or Address. User are required to substantiate any of those claims with supporting evidence such as a government issued document, utilities bill etc. The documents are cached in the local storage of the device along with a keccak 256 hash and signed by the ECDSA curve.

Claims are stored on the device as a JSON object:

```json
{
    "claims": [{
        "key": "0x02",
        "type": "dob",
        "value": "1979-04-29"
    }]
}
```

Note:  See the Microsoft claims class for .net https://docs.microsoft.com/en-us/dotnet/api/system.security.claims.claim?view=net-5.0

## User Story 1:  Onboarding a new user
```text
As a frustrated crypto customer, 
I want to onboard to the exchange via the Idem app, 
So that I don't have to re-supply all my information again and again and again!
```

```text
Given a user who has downloaded the app,  
And has verified their claims on the app,  
When they visit demo.idem.com.au registration page,  
And they scan the QR code via the app,  
And Ok on the app,  
Then they are registered on demo.idem.com.au,
And their ID is verified,  
And they are redirected to demo.idem.com.au's home page.
```

<img src="https://user-images.githubusercontent.com/91101134/138626026-94b1a7a8-6581-4ede-9fcc-ca3066afea59.png" width=50% height=50%>
<img src="https://user-images.githubusercontent.com/91101134/138625890-0f66e8bf-dfbd-494f-8f96-23ac0e3115b6.png" width=50% height=50%>

## User Flow Experience - Customer POV
The flowchart below is a user work flow demonstrating the user experience. Here we present 3 User scenarios.

### Existing Idem User
An existing Idem User will be able to log in to a participating (third party) website by simply using the Idem App to scan the QR code displayed on the participating website. Once authenticated, the User will be able to:

i)	Update their claims such as DOB, name and address using the verfied data on the Idem app.
ii)	Supplied verified evidence in the form of documents to the participating website.

### Registered (unverified) User
A registered Idem User that has not yet been verified will be able to log in to a participating (third party) website by simply using the Idem App to scan the QR code displayed on the computer screen of the participating website. Once inside the website, the User will be requested to complete verification process by uploading requested documents. Once documents have been submitted and verified, the User will be able to:

i)	Register credentials on the third party website using Idem credentials.
ii)	Verify documents using Idem authenticated documents.

### New User
A new user will initiate the registration process by entering their email address and a new password in to the participating (third party) website. At this point if the user does not complete the registration process, the new user will be able to return to the website and log in using the QR code displayed on the screen when returning to the same website. Once the New User logs in and is inside the website, the new Idem User will continue with the verification process, uploading the requested documents on the website using the Idem App. Once documents have been submitted and verified, the User will be able to:

i)	Register credentials on the website using Idem credentials.
ii)	Verify documents using Idem verified documents.

![Flowchart Experience - Customer POV r1](https://user-images.githubusercontent.com/92293107/138814366-e25e9abc-251f-40ce-8952-fb4b2ee65866.jpg)


## Verification Workflow Diagram
The flowchart below is a verification workflow diagram for 3rd party developers to integrate their Exchange or website with Idem. It works as follows:

<img src="https://user-images.githubusercontent.com/92293107/138644574-c3cb25a1-1e02-4189-b3f4-3f8c4cd2ba7c.JPG" width=75% height=75%>

1. A user with no digital ID visits “demo.idem.com.au” and creates an account by entering their email address and password (a user with a registered ID will scan a QR code and log in directly).

2. The “demo.idem.com.au” site will request give access to the user to enter the site. (dashboard)

3. A user with a registered ID will scan a QR code and have their claims verified directly. A new user will be asked to verify their claims using Idem. Specifically, this means that a user will verify specific information that is requested from them that is considered to be true, such as their name, address, etc. The user will be able to verify using existing (“old” implies already verified however document may have expired or not yet verified) mechanisms which involve uploading KYC documents (driver’s license / passports etc).

4. The user scans external QR codes, which requests specific information from the user held in Idem.

5. The user checks the information being requested in Idem, approves the claims request and Idem verifies the claim and the user gains access to external site.

6. The App posts the API specified in the QR code. Two options are to be made available

i) The App will post to the Exchange directly - see point 7. below.
ii) The App will use ECDSA to sign the certificates using Idem.
	
7. Provide call back option for ECDSA authentication to validate SSL Certificates over HTTP in Exchange, and option for Exchange to whitelist IP addresses.

8. The Exchange verifies the user’s claims and lets Idem know. Webhook needed to tie to the Exchange to let Idem know the results of the verification (eg when the verification is complete, or whether more information is needed etc).

9. Sends users to Home Page which displays verified documents.

### Implementation
### Step 1:  Onboarding on Third-Party Sites
The site "demo.idem.com.au" creates a unique deeplink url with the url schema `did://` along with the claims it requires:

* Domain (mandatory)
* Call back path
* Nonce as UUID (mandatory)
* An array of claims required

Eg: `did://callback=demo.idem.com.au&callback=/verify?nonce=8b5c66c0-bceb-40b4-b099-d31b127bf7b3&claims=[0x01]`

### Step 2:  Posting the signed data to the exchange
The user will then receive confirmation alert on the device with the claims the exchange is requesting as specified in the deeplink.  Should the user accept that request for claims, the app will the post the claims in the following DID schema.

```json
TBA
```

## User Story 2:  Verify an already registered user
Often a site will email a user once they have created an account with an email address and password.  At this step, the site could also pass an unsigned url for the users to scan with their Idem app to validate their email and other claims.

A QR code deeplink is a URL providing the claims required by site, along with a call back url.  

```text
As an existing unverified customer of demo.idem.com.au,
I want to verify my KYC requirements via Idem,
So that I don't need to complete yet another KYC process.
```

```text
Given a user who has downloaded the app,  
And has already verified their claims,  
When they visit demo.idem.com.au,  
And they scan the QR code via the app,  
And OK to sharing data on the app to demo.idem.com.au,  
Then their ID is posted from the app to demo.idem.com.au's API,
And their Idem signature is verified,
And their personal data is updated at demo.idem.com.au
```

## Verify these claims
These claims are then verified by third-party KYC vendors who return an X-509 SSL certificate signed JSON object that can then be used again. Each vendor has a different process for onboarding and the app will maintain these different business requirements.

![Verification Sequence](/assets/did.verification.sequence.svg)


## Appendix

### Routes

### Registration Schema

### Table of claims

| Key | Subject | Mnemonic | Standard | Description |
|---|---|---|---|---|
| 0x00 | Full Name | fullname | | Clients Full Name |
| 0x01 | Birth Year | birthyear | YYYY ISO 8601 | Clients Year of Birth |
| 0x02 | Date of Birth | dob | YYYY-MM-DD ISO 8601 | Clients Date of Birth | 
| 0x03 | Email | email | email | Clients email address  | 
| 0x04 | Address | address | Physical Address | Clients physical address | 
| 0x05 | Mobile Number | mobilenumber | Mobile Number | Clients mobile number | 
| 0x06 | 18+ | eighteenplus | 18 Plus | 18 Plus | 

### Table of claims data types

| Name | Value |
| --- | --- |
| decimal | |
| boolean | |
| integer | |
| email | |
| date | |
| datetime |

### Table of documents

| Key | Document | Details
| --- | --- | ---
| 0x00 | Australian birth certificate | A full birth certificate in your name or former name issued by State Authority of Births, Deaths and Marriages. We cannot accept birth extracts or birth cards.
| 0x01 | Australian driver licence | A current driver licence with your photo issued in your name. This includes physical and digital driver licences, current learner permits, and provisional licences. 

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

## References

https://www.servicesaustralia.gov.au/individuals/topics/confirm-your-identity/29166
https://en.bitcoin.it/wiki/Seed_phrase
https://docs.microsoft.com/en-us/dotnet/api/system.security.claims.claim?view=net-5.0
Transactions on the Ethereum Test Network "Kovan" will be signed with the ETH account `0xE4ed9ceF6989CFE9da7c1Eec8c2299141dD9e7cC`

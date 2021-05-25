# Server API

## Setup
Copy `.env.sample` into `.env`. The following variables must be present:

| ENV Variable Name | Description |
| --- | --- |
| PORT | Server listen port |
| MESSAGEBIRD_KEY | API Key for MessageBird |

## Starting the API

From the server folder

```bash
yarn install
yarn start
```

## End Points


/claims

```json
{
    "key": "0x02",
    "type": "dob",
    "value": "1979-04-29"
}
```
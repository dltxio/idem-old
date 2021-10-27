# Server API

## Setup
Copy `.env.sample` into `.env`. The following variables must be present:

| ENV Variable Name | Description |
| --- | --- |
| PORT | Server listen port |
| MESSAGEBIRD_KEY | API Key for MessageBird |

If ssl is set up then the privkey.pem and fullchain.pem files need to be copied into /server/ssl-cert
certbot saves these files to /etc/letsencrypt/live/{domain name}/
```bash
sudo cp /etc/letsencrypt/live/{domain name}/privkey.pem ~/idem/server/ssl-cert
sudo cp /etc/letsencrypt/live/{domain name}/fullchain.pem ~/idem/server/ssl-cert
```

## Starting the API

From the server folder

```bash
yarn install
yarn start
```

Run docker from home root
```bash
docker-compse up
docker-compose down
```

## End Points

### Claims
/api/claims

```json
{
    "key": "0x02",
    "type": "dob",
    "value": "1979-04-29"
}
```

### Emails
/api/emails PUT

```json
{
    "email": "lucas@dltx.io"
}
```
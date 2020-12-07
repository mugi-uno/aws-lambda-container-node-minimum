# aws-lambda-container-node-minimum

Minimum set of AWS Lambda Container

- Node.js
- TypeScript
- ESLint
- Prettier
- docker / docker-compose

## Debug

- launch container
  - `docker-compose up`
- curl
  - `curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'`

## Deploy

```
aws ecr get-login-password --region {region} | docker login --username AWS --password-stdin {Your AWS ID}.dkr.ecr.{region}.amazonaws.com
docker tag hanko_app:latest {Your AWS ID}.dkr.ecr.{region}.amazonaws.com/lambda-container-sandbox:latest
docker push {Your AWS ID}.dkr.ecr.{region}.amazonaws.com/lambda-container-sandbox:latest
```

## Link

:link: https://aws.amazon.com/jp/blogs/news/new-for-aws-lambda-container-image-support/
:link: https://docs.aws.amazon.com/lambda/latest/dg/runtimes-images.html
:link: https://github.com/aws/aws-lambda-nodejs-runtime-interface-client
:link: https://github.com/aws/aws-lambda-runtime-interface-emulator

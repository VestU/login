# login
"Passwordless" Login Implementation for VestU.com

# About

Our business is focused on teaching investing in an unbiased manner. To simplify logins and to limit the data we keep on our servers, we implemented "passwordless" login. The advantage is that the user only need to authenticate with their own email address. During login, the user is send a single use URL, that will log them into the system. In many ways it is like a password reset but without needing to remember yet another password.

# Setup

Login has service dependencies in AWS(SES & DYNAMODB) and can easily be deployed to Heroku or AWS:EB.

All service dependencies are determined by environmental variables as follows:

- ENVIRONMENT - "PROD" or "LOCAL";
- SECRET - Passphrase to encrypt cookies via Iron;
- AWS_KEY - Your AWS IAM KEY
- AWS_SECRET - Your AWS IAM SECRET;
- AWS_REGION - "us-west-2" //Depending on service deployment
- USERS_TABLE_NAME - Name of DynamoDB Users Table;
- TOKENS_TABLE_NAME - Name of DynamoDB Tokens Table;

DynamoDB - You will need to setup 2 dynamodb tables both with "Primary Key Type" of 'Hash' like so:
- Users (Hash Key = 'email')
- Tokens (Hash Key = 'token')

You will need to be able to send email within the app. The sendEmail method in server.js can use any email sending service or api. We implemented with SES.
# CSCI 4145 Term Project: NotifyAll

## Project Summary:

This web application aims to provide a solution for the need to send notifications, either via text message or email, to a group of people. This could be for various scenarios, such as class cancellations by an instructor or the introduction of a new member in a study group. The application aims to fulfill these requirements in a user-friendly manner.

## Motivation:

The motivation behind this web application stems from the manual process of sending notifications to a group of people. I was inspired by my mother, who runs an academic institution in Korea. Recently, I was told that she had to manually add every email and phone number for announcements. Recognizing that not everyone has a technical background, I aim to create a user-friendly solution for sending out announcements to groups.

## Explanation:

To use the application, the user must sign up and create groups with members. Each member's contact information, either email or phone number, must be provided. The user can then send out information by creating a new form that includes a title and message content. The selected groups can then be broadcasted the message through the AWS SNS service.

An additional feature is the ability to move or copy members from one group to another, eliminating the need to enter duplicated information for the same members in different groups. Another feature is language translation. Not all members may be comfortable with the language the user speaks in; hence, members can have a special field for language and will be translated once the user is broadcasting a message.

## AWS Services intended to be used:

### Compute services:

- AWS Elastic Beanstalk: AWS Elastic Beanstalk will be used mainly to host the web app. This service automatically handles deployment, scaling, monitoring, and health of your application, allowing me to focus on writing code for user-friendly application in a short period of time.
- AWS Lambda: AWS Lambda will be used to run translation code. The app will send the text to be translated to a Lambda function, which will call the Amazon Translate API and return the translated text and send. AWS Lambda will also be used for REST API along with AWS Gateway API.

### Storage services:

- AWS DynamoDB: AWS DynamoDB will be used to store users’ information as well as information of all groups and their members.
- AWS S3: AWS S3 will be used to store messages.

### Network services:

- AWS API Gateway: AWS API Gateway will be used to create RESTful APIs for the web app. It will be used to expose the Lambda function as an API, allowing your web app to access services such as the translation service.

### General services:

- Amazon Translate: Amazon Translate service will be used to translate the text messages to be broadcasted. The service uses deep learning models to produce high-quality translations in real-time.
- AWS SNS: Amazon SNS will be used to send out notifications to users of groups.
- AWS Event: May be a replacement of AWS SNS, depends how things look once I start developing the backend.

## Deployment Model:

To be written.

## Delivery Model:

To be written.

## Final System Architecture:

To be written.

## Security Aspect:

To be written.

## Cost Analysis:

To be written.

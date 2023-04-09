import AWS from "aws-sdk";

interface TranslateResponse {
  TranslatedText: string;
}

export async function translateMessage(message: string, language: string) {
  const AWS = require("aws-sdk");

  const sts = new AWS.STS();
  const paramsforaws = {
    RoleArn: "arn:aws:iam::772082998819:role/LabRole",
    RoleSessionName: "LabRole",
  };

  sts.assumeRole(paramsforaws, async function () {
    const translate = new AWS.Translate({
      accessKeyId: "ASIA3HQ53TYRVSBXFEEK",
      secretAccessKey: "YcR9NxmHlmKfzYUfoD8KH+6YU715MK/gDCtPy/Y0",
      sessionToken:
        "FwoGZXIvYXdzEKD//////////wEaDAfi+1mtgaPFkVkXtyLAAb1StUjLkHOJVJ9qNpESY5tWP/PHnw+4IfAoJvT1UwgT7G3aA4dYFQGT3AstfTM0mqXW0I8rkfdIKioZGg9iRUHMnf5Won6o5goW3iPGtje7M1kHrxZTQVLoSwpomPMnxWqtJCnrhEfGWEMBPWtXGs/IdXed8q81Et9zibZlzrPtnPLgEcd0mRb6gtba+4m5HMFFzyeR9GGyacEe5+UEeDiGpO2b3aWUpZ2KnT8zZshVspaRnZbxTahTrYXc2S4JIyiVksuhBjItG+3COw6Gv22nrCU+Jc9eZ+4jUKzXi9H0HUxXcd1QaADkFBnYlCRHu87AFADA",
      region: "us-east-1",
    });
    const params = {
      SourceLanguageCode: "auto", // Automatically detect source language
      TargetLanguageCode: language,
      Text: message,
    };
    console.log(
      process.env.AWS_ACCESS_KEY_ID,
      process.env.AWS_SECRET_ACCESS_KEY,
      process.env.AWS_REGION
    );

    const { TranslatedText } = await translate
      .translateText(params)
      .promise()
      .catch((error: any) => {
        console.error("Failed to translate message:", error);
        throw error;
      });
    return TranslatedText;
  });
}

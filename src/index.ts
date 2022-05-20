import { LambdaClient, ListFunctionsCommand } from '@aws-sdk/client-lambda';

const getLambdaFunctions = async () => {
  let allFunctions = [];
  let marker;
  do {
    // eslint-disable-next-line no-await-in-loop
    const lambdaClient = new LambdaClient({});
    try {
      const { Functions, NextMarker } = await lambdaClient.send(
        new ListFunctionsCommand({
          Marker: marker,
          MaxItems: 50,
        }),
      );
      allFunctions = [...allFunctions, ...Functions];
      marker = NextMarker;
    } catch (e) {
      console.error(e);
    }
  } while (marker);

  return allFunctions;
};

export const runGuardianChecks = async () => {
  // AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
  console.log('Hello !');
  const result = await getLambdaFunctions();
  console.log(result);
};

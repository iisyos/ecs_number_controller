const {ECSClient, waitUntilServicesStable} = require("@aws-sdk/client-ecs");

(async (event) => {
  console.log("Received payload: ", event);
  const client = new ECSClient({ region: "ap-northeast-1" });
  try {
    const result = await waitUntilServicesStable(
      { client, maxWaitTime: 15 * 60, maxDelay: 30, minDelay: 15 },
      {
        cluster: "portfolio",
        services: ["backend"],
      }
    );
    console.log("Services are stable: ", result);

    return {
      statusCode: 200,
      body: JSON.stringify("Services are stable"),
    };
  } catch (error) {
    console.log("Error waiting for services to stabilize: ", error);
    throw new Error("Error waiting for services to stabilize: ", error);
  }
})();

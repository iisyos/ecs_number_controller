const { ECSClient, UpdateServiceCommand } = require("@aws-sdk/client-ecs");

(async() => {
  // console.log("Received payload: ", event);
  const client = new ECSClient();
  const params = {
    cluster: "portfolio",
    service: "backend",
    desiredCount: 1
  };

  const command = new UpdateServiceCommand(params);

  try {
    const data = await client.send(command);
    console.log("Service updated successfully: ", data);
    const response = {
        statusCode: 200,
        body: JSON.stringify('Service updated successfully!'),
    };
    return response;
  } catch (error) {
    console.log("Error updating ECS service: ", error);
    throw new Error('Error updating ECS service: ', error);
  }
})();
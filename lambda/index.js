const { ECSClient, UpdateServiceCommand } = require("@aws-sdk/client-ecs");

exports.handler = async(event) => {
  console.log("Received payload: ", event);

  const client = new ECSClient({ region: "us-east-1" }); // replace "us-east-1" with your AWS region
  const params = {
    service: event.ServiceName,
    cluster: event.ClusterName,
    desiredCount: event.DesiredCount
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
    console.error("Error updating service: ", error);
    const response = {
        statusCode: 500,
        body: JSON.stringify('Error updating service.'),
    };
    return response;
  }
};
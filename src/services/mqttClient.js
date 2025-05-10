import mqtt from "mqtt";

const client = mqtt.connect(import.meta.env.VITE_API_MQTT_BROKER);

client.on("connect", () => {
  console.log("MQTT connected");
  client.subscribe("/add");
});

client.on("error", (err) => {
  console.error("MQTT connection error:", err);
});

export default client;

/* Throwaway: verify Convert SDK credentials + inspect the loaded project config.
   Reads creds from .env.local (so no secret on the command line). */
const fs = require("fs");
const path = require("path");

function loadEnvLocal() {
  const file = path.join(__dirname, "..", ".env.local");
  const out = {};
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

(async () => {
  const env = loadEnvLocal();
  const sdkKey = env.CONVERT_SDK_KEY;
  const sdkKeySecret = env.CONVERT_SDK_KEY_SECRET;
  const environment = env.CONVERT_ENVIRONMENT || "production";

  const mask = (s) => (s ? `${s.slice(0, 4)}…${s.slice(-4)} (len ${s.length})` : "(missing)");
  console.log("sdkKey      :", mask(sdkKey));
  console.log("sdkKeySecret:", mask(sdkKeySecret));
  console.log("environment :", environment);
  console.log("---");

  const { default: ConvertSDK } = require("@convertcom/js-sdk");
  const sdk = new ConvertSDK({ sdkKey, sdkKeySecret, environment });

  try {
    await Promise.race([
      sdk.onReady(),
      new Promise((_, r) => setTimeout(() => r(new Error("onReady timeout after 15s")), 15000)),
    ]);
  } catch (e) {
    console.log("RESULT: ❌ onReady FAILED —", e.message);
    console.log("data present:", !!sdk.data);
    process.exit(0);
  }

  const data = sdk.data;
  if (!data) {
    console.log("RESULT: ⚠️  onReady resolved but no config data was loaded (likely bad key / wrong key type).");
    process.exit(0);
  }

  console.log("RESULT: ✅ onReady OK — config loaded.");
  console.log("top-level config keys:", Object.keys(data));

  const project = data.project || {};
  console.log("project:", JSON.stringify({ id: project.id, name: project.name, type: project.type }, null, 0));

  const experiences = Array.isArray(data.experiences) ? data.experiences : [];
  const features = Array.isArray(data.features) ? data.features : [];
  const goals = Array.isArray(data.goals) ? data.goals : [];
  console.log(`experiences: ${experiences.length}, features: ${features.length}, goals: ${goals.length}`);
  console.log(
    "experience keys:",
    experiences.map((e) => `${e.key || "(no key)"}#${e.id} [${e.type}/${e.status}]`),
  );
  console.log("feature keys:", features.map((f) => f.key || `#${f.id}`));

  const target = experiences.find((e) => e.key === "weight_loss_hero");
  console.log(
    "weight_loss_hero experience:",
    target
      ? `FOUND (#${target.id}, status=${target.status}, variations=${(target.variations || []).map((v) => v.key).join(",")})`
      : "NOT FOUND (needs to be created in the dashboard)",
  );

  process.exit(0);
})();

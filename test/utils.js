const brokenCapabilities = {
  browserName: "googlechrome",
  platformName: "macOS 10.15",
  browserVersion: "latest",
  "sauce:options": {
    name: "Broken Google Search",
    screenResolution: "1280x960",
    //Task IV
    tags: ["brokenSauce"],
  },
};

const workingCapabilities = {
  browserName: "googlechrome",
  platformName: "macOS 10.15",
  browserVersion: "latest",
  "sauce:options": {
    name: "Guinea-Pig Sauce",
    screenResolution: "1280x960",
    //Task IV
    tags: ["workingSauce"],
  },
};

exports.brokenCapabilities = brokenCapabilities;
exports.workingCapabilities = workingCapabilities;

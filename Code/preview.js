document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const caseNumber = urlParams.get("case");

    const sketchfabModels = {
        "1": "70fdd2ca11ce472a974acf25bb3f8c6b",  // Evangelion AirPods Case
        "2": "f2c3bca409874cd0a7b1bd3255a8629a"  // Gundam Earbuds Grey
    };

    // Get the correct model ID based on case number
    const modelId = sketchfabModels[caseNumber];

    if (modelId) {
        const iframe = document.getElementById("sketchfab-iframe");
        iframe.src = `https://sketchfab.com/models/${modelId}/embed`;
        document.getElementById("preview-title").textContent = `Preview Case ${caseNumber}`;
    } else {
        console.error("Invalid case number.");
    }
});

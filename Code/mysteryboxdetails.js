document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const boxId = urlParams.get("id");

    fetch("mysteryboxes.json")
        .then(response => response.json())
        .then(data => {
            const box = data.mystery_boxes.find(item => item.id == boxId);

            if (box) {
                // Populate mystery box details
                document.getElementById("mysterybox-image").src = box.image;
                document.getElementById("mysterybox-name").textContent = box.name;
                document.getElementById("mysterybox-price").textContent = `$${box.price}`;
                document.getElementById("mysterybox-description").textContent = box.description;

                // Format and display correct possible pulls (Fix here)
                const possiblePullsContainer = document.getElementById("mysterybox-pulls");
                possiblePullsContainer.innerHTML = ""; // Clear previous content

                Object.entries(box.possible_pulls).forEach(([rarity, percentage]) => {
                    const pullElement = document.createElement("span");
                    pullElement.classList.add("possible-pull");
                    pullElement.textContent = `${rarity} (${percentage}%)`;
                    possiblePullsContainer.appendChild(pullElement);
                });

                // Only show Preview buttons for the Legendary Box
                if (box.name.includes("Legendary")) {
                    const previewButtons = document.getElementById("preview-buttons");
                    previewButtons.classList.remove("hidden"); // Show preview buttons

                    document.getElementById("preview-case-1").addEventListener("click", () => {
                        window.location.href = `preview.html?case=1&box=${boxId}`;
                    });

                    document.getElementById("preview-case-2").addEventListener("click", () => {
                        window.location.href = `preview.html?case=2&box=${boxId}`;
                    });
                }
            } else {
                console.error("Mystery box not found!");
            }
        })
        .catch(error => console.error("Error loading mystery box details:", error));
});

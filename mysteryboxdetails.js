document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const boxId = urlParams.get("id");

    fetch("mysteryboxes.json")
        .then(response => response.json())
        .then(data => {
            const box = data.mystery_boxes.find(item => item.id == boxId);

            if (box) {
                document.getElementById("box-image").src = box.image;
                document.getElementById("box-name").textContent = box.name;
                document.getElementById("box-pulls").textContent = Object.entries(box.possible_pulls)
                    .map(([rarity, percentage]) => `${rarity} (${percentage})`).join(", ");
                document.getElementById("box-price").textContent = box.price;
                document.getElementById("box-description").textContent = box.description;
            } else {
                console.error("Mystery box not found!");
            }
        })
        .catch(error => console.error("Error loading mystery box details:", error));
});

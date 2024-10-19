let currentUnit = "px";
let lockWidth = false;
let lockHeight = false;

function calculateAspectRatio() {
    const ratioWidth = parseFloat(document.getElementById('ratioWidth').value);
    const ratioHeight = parseFloat(document.getElementById('ratioHeight').value);
    let pixelsWidth = parseFloat(document.getElementById('pixelsWidth').value);
    let pixelsHeight = parseFloat(document.getElementById('pixelsHeight').value);
    const updatedUnit = document.getElementById('unit').value;

    if (!ratioWidth || !ratioHeight) return;

    const aspectRatio = ratioWidth / ratioHeight;

    const conversionFactors = {
        'px': { 'in': 1 / 96, 'cm': 1 / 37.79527559055118 },
        'in': { 'px': 96, 'cm': 2.54 },
        'cm': { 'px': 37.79527559055118, 'in': 1 / 2.54 }
    };

    function convertUnits(value, fromUnit, toUnit) {
        if (fromUnit === toUnit) return value;
        return value * conversionFactors[fromUnit][toUnit];
    }

    if (!lockWidth) {
        pixelsHeight = (pixelsWidth / aspectRatio);
    } else if (!lockHeight) {
        pixelsWidth = (pixelsHeight * aspectRatio);
    }

    pixelsWidth = convertUnits(pixelsWidth, currentUnit, updatedUnit);
    pixelsHeight = convertUnits(pixelsHeight, currentUnit, updatedUnit);

    const diagonalLength = Math.sqrt(Math.pow(pixelsWidth, 2) + Math.pow(pixelsHeight, 2));
    const sizeResult = (pixelsWidth * pixelsHeight) / (1000000); // Convert to megapixels

    document.getElementById('widthUnit').textContent = updatedUnit;
    document.getElementById('heightUnit').textContent = updatedUnit;

    document.getElementById('pixelsWidth').value = Math.round(pixelsWidth);
    document.getElementById('pixelsHeight').value = Math.round(pixelsHeight);
    document.getElementById('aspectRatioText').textContent = `${ratioWidth}:${ratioHeight}`;
    document.getElementById('sizeResult').textContent = sizeResult.toFixed(2);
    document.getElementById('aspectRatioResult').textContent = aspectRatio.toFixed(2);
    document.getElementById('diagonalResult').textContent = Math.round(diagonalLength);
    document.getElementById('angleDiagonalResult').textContent = (Math.atan(ratioWidth / ratioHeight)).toFixed(2);
    document.getElementById('angleDiagonalDegreeResult').textContent = (Math.atan(ratioWidth / ratioHeight) * (180 / Math.PI)).toFixed(2);
}

function toggleLockWidth() {
    lockWidth = !lockWidth;
    const lockButton = document.getElementById('toggleWidth');
    lockButton.classList.toggle('locked');
    lockButton.textContent = lockWidth ? '🔓' : '🔒';
}

function toggleLockHeight() {
    lockHeight = !lockHeight;
    const lockButton = document.getElementById('toggleHeight');
    lockButton.classList.toggle('locked');
    lockButton.textContent = lockHeight ? '🔓' : '🔒';
}

document.getElementById('ratioWidth').addEventListener('input', calculateAspectRatio);
document.getElementById('ratioHeight').addEventListener('input', calculateAspectRatio);
document.getElementById('pixelsWidth').addEventListener('input', calculateAspectRatio);
document.getElementById('pixelsHeight').addEventListener('input', calculateAspectRatio);
document.getElementById('presetRatios').addEventListener('change', function() {
    const [width, height] = this.value.split(':');
    document.getElementById('ratioWidth').value = width;
    document.getElementById('ratioHeight').value = height;
    calculateAspectRatio();
});
document.getElementById('unit').addEventListener('change', function() {
    currentUnit = this.value;
    calculateAspectRatio();
});
document.getElementById('toggleWidth').addEventListener('click', toggleLockWidth);
document.getElementById('toggleHeight').addEventListener('click', toggleLockHeight);

function copyToClipboard() {
    const aspectRatio = document.getElementById('aspectRatioText').textContent;
    const size = document.getElementById('sizeResult').textContent;
    const diagonal = document.getElementById('diagonalResult').textContent;
    const resultText = `Aspect Ratio: ${aspectRatio}, Size: ${size} megapixels, Diagonal Length: ${diagonal} pixels`;

    navigator.clipboard.writeText(resultText).then(() => {
        alert("Copied to clipboard: " + resultText);
    }, (err) => {
        alert("Failed to copy: ", err);
    });
}

function resetValues() {
    document.getElementById('ratioWidth').value = 16;
    document.getElementById('ratioHeight').value = 9;
    document.getElementById('pixelsWidth').value = 1280;
    document.getElementById('pixelsHeight').value = 720;
    document.getElementById('presetRatios').selectedIndex = 0;
    document.getElementById('unit').selectedIndex = 0;
    lockWidth = false;
    lockHeight = false;
    toggleLockWidth();
    toggleLockHeight();
    calculateAspectRatio();
}

calculateAspectRatio();

// 1. Setup Map
const map = L.map('map', { zoomControl: false }).setView([44.4268, 26.1025], 15);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

// 2. Route Waypoints (Coords: [Lat, Lng])
const waypoints = [
    { pos: [44.4268, 26.1025], isStop: false },
    { pos: [44.4285, 26.1050], isStop: true }, // The STOP
    { pos: [44.4310, 26.1080], isStop: false }
];

let currentIndex = 0;
let currentLang = 'en';

// 3. Create Visuals
const polyline = L.polyline(waypoints.map(w => w.pos), { color: '#ff0000', weight: 5 }).addTo(map);
const vehicle = L.circleMarker(waypoints[0].pos, { radius: 10, color: '#fff', fillOpacity: 1 }).addTo(map);

// 4. Movement Logic with "Smooth Brake"
function move() {
    let start = waypoints[currentIndex].pos;
    let nextIndex = (currentIndex + 1) % waypoints.length;
    let end = waypoints[nextIndex].pos;
    let isNextAStop = waypoints[nextIndex].isStop;

    let step = 0;
    const duration = 100; // Total frames

    function animate() {
        step++;
        let progress = step / duration;

        // --- BRAKE LOGIC ---
        // If the next point is a stop, we slow down (Ease-Out)
        let t = isNextAStop ? (1 - Math.pow(1 - progress, 2)) : progress;

        let lat = start[0] + (end[0] - start[0]) * t;
        let lng = start[1] + (end[1] - start[1]) * t;
        vehicle.setLatLng([lat, lng]);

        if (step < duration) {
            requestAnimationFrame(animate);
        } else {
            currentIndex = nextIndex;
            if (isNextAStop) {
                handleStop();
            } else {
                move();
            }
        }
    }
    animate();
}

// 5. 10-Second Wait Logic
function handleStop() {
    document.getElementById('status-val').innerText = translations[currentLang].stopped;
    setTimeout(() => {
        document.getElementById('status-val').innerText = translations[currentLang].moving;
        move();
    }, 10000); // Exactly 10 seconds
}

// 6. UI Updates
function updateLanguage() {
    currentLang = document.getElementById('lang-select').value;
    const dict = translations[currentLang];
    document.getElementById('txt-title').innerText = dict.title;
    document.getElementById('lbl-line').innerText = dict.line;
    document.getElementById('lbl-color').innerText = dict.color;
    document.getElementById('lbl-status').innerText = dict.status;
}

document.getElementById('color-input').addEventListener('input', (e) => {
    polyline.setStyle({ color: e.target.value });
});

// Start the simulation
move();

// 1. Audio Setup
const engineSound = new Audio('assets/subway-engine.mp3');
const brakeSound = new Audio('assets/brake-squeal.mp3');
engineSound.loop = true;

// 2. Map Setup (Dark Tiles)
const map = L.map('map', { zoomControl: false }).setView([44.43, 26.10], 16);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

// 3. Waypoints (The Route)
const route = [
    { pos: [44.432, 26.101], isStop: false },
    { pos: [44.435, 26.105], isStop: true }, // STATION
    { pos: [44.438, 26.109], isStop: false }
];

let currentIndex = 0;
const train = L.circleMarker(route[0].pos, { radius: 12, color: '#fff', fillOpacity: 1 }).addTo(map);
const line = L.polyline(route.map(r => r.pos), { color: '#0078ff', weight: 6 }).addTo(map);

function initSystem() {
    engineSound.play();
    document.getElementById('btn-start').style.display = 'none';
    moveTrain();
}

function moveTrain() {
    let start = route[currentIndex].pos;
    let nextIdx = (currentIndex + 1) % route.length;
    let end = route[nextIdx].pos;
    let isNextAStop = route[nextIdx].isStop;

    let step = 0;
    const duration = 150; // Total frames for movement

    function frame() {
        step++;
        let progress = step / duration;

        // --- SMOOTH BRAKE (Quadratic Easing) ---
        // If next point is a stop, slow down at the end.
        let t = isNextAStop ? (1 - Math.pow(1 - progress, 2)) : progress;

        let lat = start[0] + (end[0] - start[0]) * t;
        let lng = start[1] + (end[1] - start[1]) * t;
        const currentPos = [lat, lng];
        
        train.setLatLng(currentPos);
        
        // --- 3D TRIP VIEW (Camera Lock) ---
        map.setView(currentPos, 18, { animate: false });

        // --- SOUND ENGINE ---
        // Pitch drops as we slow down for a stop
        let speed = isNextAStop ? (1 - progress) : 1;
        engineSound.playbackRate = 0.6 + (speed * 0.4);
        
        // Squeal brakes right before stopping
        if (isNextAStop && progress > 0.85 && progress < 0.9) {
            brakeSound.play();
        }

        if (step < duration) {
            requestAnimationFrame(frame);
        } else {
            currentIndex = nextIdx;
            if (isNextAStop) {
                document.getElementById('status-val').innerText = translations[currentLang].stopped;
                setTimeout(() => {
                    document.getElementById('status-val').innerText = translations[currentLang].moving;
                    moveTrain();
                }, 10000); // 10 Second Wait
            } else {
                moveTrain();
            }
        }
    }
    frame();
}
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
// Setup Audio
const engineSound = new Audio('assets/subway-engine.mp3');
engineSound.loop = true;

const brakeSound = new Audio('assets/brake-squeal.mp3');

function updateAudio(speed, isBraking) {
    if (speed > 0) {
        if (engineSound.paused) engineSound.play();
        // Pitch goes up as speed increases
        engineSound.playbackRate = 0.5 + (speed * 0.5); 
        engineSound.volume = 0.3 + (speed * 0.7);
    }
    
    if (isBraking && speed < 0.3) {
        brakeSound.play();
    }
}
    function animate() {
    step++;
    let progress = step / duration;

    // Smooth Brake (Ease-Out)
    let t = isNextAStop ? (1 - Math.pow(1 - progress, 2)) : progress;

    let lat = start[0] + (end[0] - start[0]) * t;
    let lng = start[1] + (end[1] - start[1]) * t;
    
    const currentPos = [lat, lng];
    vehicle.setLatLng(currentPos);
    
    // --- 3D TRIP VIEW ---
    // Keep the camera locked on the train and zoom in close
    map.setView(currentPos, 18, { animate: false }); 

    // Update Audio based on progress
    let speedFactor = isNextAStop ? (1 - progress) : 1;
    updateAudio(speedFactor, isNextAStop && progress > 0.8);

    if (step < duration) {
        requestAnimationFrame(animate);
    } else {
        // ... rest of your stop logic
    }
}
    

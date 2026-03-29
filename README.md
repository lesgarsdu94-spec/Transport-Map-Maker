# 🚌 Mobile Transport Map (Leaflet Edition)

A web-based transport simulation optimized for **Xiaomi HyperOS** and mobile browsers. This project features real-time vehicle movement, customizable line colors, and a programmed 10-second stop logic at stations.

## 🚀 Features
* **Real-time Simulation:** A vehicle marker moves along a predefined route.
* **Station Logic:** The vehicle stops completely for **10 seconds** at designated stop markers.
* **Customization:** Change the Line Number and the Route Color using a HEX color picker.
* **Mobile Optimized:** Built with **Leaflet.js** for smooth "pinch-to-zoom" and touch navigation.
* **Dark Mode UI:** A sleek, semi-transparent interface inspired by HyperOS.

## 🛠️ How it Works
1.  **Data Structure:** The transport lines are stored as an array of coordinates (Latitude and Longitude).
2.  **Movement:** The script calculates the next position every 2 seconds.
3.  **Wait Logic:** When the `currentIndex` matches a station, a `setTimeout` function pauses the movement for exactly 10,000ms.

## 📱 Performance for HyperOS
To ensure the best experience on Xiaomi devices:
* Used **Hardware Accelerated** Leaflet layers.
* Implemented a `viewport` meta tag to prevent accidental zooming while typing.
* Used `backdrop-filter` for a modern glass-morphism UI effect.

## 📂 Project Structure
* `index.html`: The structure of the map and the UI control panel.
* `main.js`: The "brain" containing the movement and stopping logic.
* `style.css`: (Optional) Custom styling for the Dark Mode theme.

## 🧑‍💻 About the Author
I am a middle school student and started my coding journey in 2023 using Scratch! This is one of my first steps into JavaScript and Web Development.

---
Built with ❤️ and Leaflet.js

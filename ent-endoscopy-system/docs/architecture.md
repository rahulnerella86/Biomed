# Architecture

High-level architecture for Ent-Endoscopy-System.

- **ESP32 firmware** captures frames from the camera and transfers data via **BLE** and/or **Wi-Fi streaming**.
- **Mobile app** receives frames, can run **TFLite inference** locally, and initiates **teleconsult** flows.
- **Backend** provides teleconsult endpoints and WebRTC configuration.
- **ML model pipeline** trains the ent classifier and exports **TFLite**.
- **Pilot** documentation defines consent and data collection protocol.


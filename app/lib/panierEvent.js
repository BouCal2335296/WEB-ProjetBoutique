// lib/panierEvents.js
const panierEvent = new EventTarget();

export function notifyPanierChange() {
    panierEvent.dispatchEvent(new Event("panierChange"));
}

export function listenPanierChange(callback) {
    panierEvent.addEventListener("panierChange", callback);
}

export function removePanierListener(callback) {
    panierEvent.removeEventListener("panierChange", callback);
}

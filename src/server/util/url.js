export function getLastPathURL() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1);
}

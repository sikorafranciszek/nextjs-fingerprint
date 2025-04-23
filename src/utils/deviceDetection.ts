// The following arrays are adapted from:
// https://medium.com/creative-technology-concepts-code/detect-device-browser-and-version-using-javascript-8b511906745
const DEVICES = [
    { name: 'Windows Phone', value: 'Windows Phone' },
    { name: 'Windows computer', value: 'Win' },
    { name: 'iPhone', value: 'iPhone' },
    { name: 'iPad', value: 'iPad' },
    { name: 'Kindle device', value: 'Silk' },
    { name: 'Android device', value: 'Android' },
    { name: 'PlayBook', value: 'PlayBook' },
    { name: 'BlackBerry', value: 'BlackBerry' },
    { name: 'macOS computer', value: 'Mac' },
    { name: 'Linux computer', value: 'Linux' },
    { name: 'Palm device', value: 'Palm' }
];

const BROWSERS = [
    { name: 'Edge', value: 'Edge' },
    { name: 'Chrome', value: 'Chrome' },
    { name: 'Firefox', value: 'Firefox' },
    { name: 'Safari', value: 'Safari' },
    { name: 'Internet Explorer', value: 'MSIE' },
    { name: 'Opera', value: 'Opera' },
    { name: 'BlackBerry', value: 'CLDC' },
    { name: 'Mozilla', value: 'Mozilla' }
];

/**
 * Returns a simple object containing the browser and device of the current session.
 */
export function getDeviceDescription(userAgent: string): { browser: string, device: string } {
    const device = DEVICES.filter(x => userAgent.indexOf(x.value) !== -1);
    const browser = BROWSERS.filter(x => userAgent.indexOf(x.value) !== -1);

    return {
        browser: (browser.length ? browser[0].name : "Unknown Browser"),
        device: (device.length ? device[0].name : "Unknown Device")
    };
} 
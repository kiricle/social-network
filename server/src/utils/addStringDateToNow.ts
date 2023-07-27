export function addStringDateToNow(lifetimeString: string): Date {
    const time = lifetimeString.replace(/[^\d]/g, '');
    const unit = lifetimeString.replace(/[^a-zA-Z]/g, '');
    const now = new Date();

    const returnObject = {
        days: () => now.setDate(now.getDate() + parseInt(time)),
        day: () => now.setDate(now.getDate() + parseInt(time)),
        d: () => now.setDate(now.getDate() + parseInt(time)),
        h: () => now.setHours(now.getHours() + parseInt(time)),
        m: () => now.setMinutes(now.getMinutes() + parseInt(time)),
        s: () => now.setSeconds(now.getSeconds() + parseInt(time)),
    };

    returnObject[unit]();

    return now;
}

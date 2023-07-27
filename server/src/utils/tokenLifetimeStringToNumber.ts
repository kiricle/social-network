export function tokenLifetimeStringToNumber(lifetimeString: string) {
    const time = Number.parseInt(lifetimeString.replace(/[^\d]/g, ''));
    const unit = lifetimeString.replace(/[^a-zA-Z]/g, '');

    const returnObject = {
        days: () => time * 24 * 60 * 60 * 1000,
        day: () => time * 24 * 60 * 60 * 1000,
        d: () => time * 24 * 60 * 60 * 1000,
        h: () => time * 60 * 60 * 1000,
        m: () => time * 60 * 1000,
        s: () => time * 1000,
    };

    return returnObject[unit]();
}

import afterFrame from "afterframe";

export const measureInteraction = (message) => {
    const startTimestamp = performance.now();

    const end = () => {
        const endTimestamp = performance.now();
        const m = `${message ? message + ' ' : 'The interaction took '}${endTimestamp - startTimestamp} ms`;
        console.log(`%c${m}`, 'color: rgb(204, 197, 0); font-size: 1.3em; font-weight: bold;');
    }

    return { end };
}

function getCaller() {
    var callerName;
    try { throw new Error(); }
    catch (e) {
        var re = /(\w+)@|at (\w+) \(/gu, st = e.stack, m;
        re.exec(st);
        re.exec(st);
        m = re.exec(st);
        callerName = m[1] || m[2];
    }
    return callerName;
};

export const measureRenderTime = () => {
    const interaction = measureInteraction(`Rendering the ${getCaller()} component took`);

    afterFrame(() => {
        interaction.end();
    })
}

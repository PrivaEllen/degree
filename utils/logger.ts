import log4js from 'log4js';

const logAppender = (layout?: log4js.LayoutFunction) => {
    return (loggingEvent: log4js.LoggingEvent) => {
        const {
            data: [message, index],
        } = loggingEvent;

        if (typeof index === 'number' && index > 0) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
        }

        loggingEvent.data = [message];
        process.stdout.write(`${layout?.(loggingEvent)}`);
    };
};

const logModule = {
    configure: (config: log4js.Config, layouts?: log4js.LayoutsParam) => {
        let layout = layouts?.colouredLayout;

        if (config.layout) {
            layout = layouts?.layout(config.layout.type, config.layout);
        }
        return logAppender(layout);
    },
};

log4js.configure({
    appenders: { custom: { type: logModule } },
    categories: { default: { appenders: ['custom'], level: 'debug' } },
});

export const logger = log4js.getLogger();

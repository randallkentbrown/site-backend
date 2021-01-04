const processPages = (pages) => {
    const reducer = (visiblePages, pageData) => {
        if (pageData.visible) {
            visiblePages.push(pageData);
        }
        return visiblePages;
    };
    const truePages = [];
    pages.reduce(reducer, truePages);
    const convertPriority = (priority) => {
        if (priority < 0) {
            return Number.MAX_SAFE_INTEGER + priority;
        } else {
            return priority;
        }
    };
    truePages.sort((first, second) => {
        let p1 = convertPriority(first.priority);
        let p2 = convertPriority(second.priority);
        return p1 - p2;
    });
    truePages.forEach(page => {
        let idx = truePages.indexOf(page);
        truePages[idx].number = idx;
    });
    truePages.sort((first, second) => {
        let p1 = first.number;
        let p2 = second.number;
        return p1 - p2;
    });
    return truePages;
}

exports.processPages = processPages;


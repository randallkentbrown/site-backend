const { isGcsTfliteModelOptions } = require("firebase-admin/lib/machine-learning/machine-learning-api-client");

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

/**
 * Returns true if list is a list and each element has a 'priority' field.
 */
const prioritized = (list) => {
    let pri = true;
    list.forEach((item) => {
        if (item.priority == null) {
            pri = false;
        }
    });
    return pri;
}

/**
 * Sorts a list of objects, assuming that they all have the "priority" field.
 * @param list the list of objects to sort
 */
const priSort = (list) => {
    if (!(prioritized(list))) {
        return;
    }
    list.sort((first, second) => {
        return first.priority - second.priority;
    });
}

exports.prioritySort = priSort;

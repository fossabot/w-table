
export const pivot = ({
    element: (key, group) => {
        return `${key} (${group.length})`;
    },
    accessor: (item) => item.year,
    groupingFunction: (items, accessor) => {
        const grouped = new Map();
        items.forEach((item) => {
            const key = accessor(item);
            const currentGroup = grouped.get(key);
            if (!currentGroup) {
                grouped.set(key, new Array());
            } else {
                currentGroup.push(item);
            }
        });
        return grouped;
    }
})
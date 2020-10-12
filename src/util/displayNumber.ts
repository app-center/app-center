/**
 * Created by samhwang1990@gmail.com.
 */

const ranges = [
    { divider: 1e18 , suffix: 'E' },
    { divider: 1e15 , suffix: 'P' },
    { divider: 1e12 , suffix: 'T' },
    { divider: 1e9 , suffix: 'G' },
    { divider: 1e6 , suffix: 'M' },
    { divider: 1e3 , suffix: 'k' }
];

export function formatNumber(n) {
    if (n < 0) {
        return '-' + formatNumber(-n)
    }
    
    for (let i = 0; i < ranges.length; i++) {
        if (n >= ranges[i].divider) {
            return (n / ranges[i].divider).toFixed(1) + ranges[i].suffix;
        }
    }
    
    return n.toString();
}

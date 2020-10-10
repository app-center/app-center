/**
 * Created by samhwang1990@gmail.com.
 */

import format from "dayjs";

export function displayMS(ts: number): string {
    if (!ts) return ''
    return format(ts).format("YYYY-MM-DD HH:mm:ss")
}

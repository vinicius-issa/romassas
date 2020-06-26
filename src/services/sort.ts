export const descendingComparator = (a:any,b:any,orderBy:string|number):number => {
    if (b[orderBy] < a[orderBy]) return -1;
    else if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}
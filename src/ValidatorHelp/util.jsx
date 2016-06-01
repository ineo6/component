/**
 * Created by neo on 16/5/13.
 */



export function isPositiveInteger(value){
    var n = ~~Number(value);
    return String(n) == value && n > 0;
}
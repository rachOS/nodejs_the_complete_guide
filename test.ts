export function test(cb : VoidFunction) {
    console.log("=>(index.ts:3) before cb   ", cb);
    console.log("=>(index.ts:5) after cb", cb);
    return cb()
}
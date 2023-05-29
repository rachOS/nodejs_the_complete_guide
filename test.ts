export function test(cb: (a: any, b: any) => any): any {
  console.log('=>(index.ts:5) inner cb', cb);
  return cb;
}

console.log('=>(index.ts:3) after cb   ');

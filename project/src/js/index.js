// js here
let name = 'ES2015';
let output = `${name} test`;

console.log(output);


$.ajax({
  url: '/api/navigation/group',
}).then( data => {
  console.log(data)
});
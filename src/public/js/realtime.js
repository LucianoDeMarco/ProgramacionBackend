const socket = io();

socket.on('products', products => {
  const list = document.getElementById('products');

  list.innerHTML = products
    .map(p => `<li>${p.title}</li>`)
    .join('');
});
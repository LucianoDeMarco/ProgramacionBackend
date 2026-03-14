const socket = io();

const productForm = document.getElementById('productForm');
const list = document.getElementById('products');

socket.on('products', products => {
    list.innerHTML = ''; // Limpiamos la lista
    
    products.forEach(p => {
        const li = document.createElement('li');
        li.style.padding = "5px";
        li.style.borderBottom = "1px solid #eee";
        li.innerHTML = `<strong>${p.title}</strong> - $${p.price} `;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Eliminar';
        deleteBtn.onclick = () => deleteProduct(p.id);
        
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
});

async function deleteProduct(id) {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
}

// Formulario
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const product = {
        title: document.getElementById('title').value,
        price: Number(document.getElementById('price').value)
    };

    const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });

    if (response.ok) productForm.reset();
});
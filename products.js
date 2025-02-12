const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

async function list (options = {}) {

    const { offset = 0, limit = 25, tag } = options;

    const data = await fs.readFile(productsFile)

    return JSON.parse(data)
    .filter(product => {
        if (!tag) {
            return product
        }

        return product.tags.find(( { title } ) => title == tag)
    })
    .slice(offset, offset + limit)
}

async function get (id) {
    const products = JSON.parse(await fs.readFile(productsFile))

    for (let i = 0; i < products.length; i++ ) {
        if (products[i].id === id) {
            return products[i]
        }
    }

    return null;
}

/**
 * Delete a product 
 */
async function deleteProduct(id) {
    console.log(`Deleting product with ID: ${id}`);
    return { message: `Product ${id} deleted.` };
}

/**
 * Update a product 
 */
async function updateProduct(id, updates) {
    console.log(`Updating product with ID: ${id}`, updates);
    return { message: `Product ${id} updated.`, updates };
}

module.exports = {
    list,
    get,
    updateProduct,
    deleteProduct
}
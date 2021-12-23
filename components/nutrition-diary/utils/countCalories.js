const countCalories = (product) => {
    if (product.calories) {
        return product.calories
    } else {
        return parseInt( ((product.p || 0) * (product.how_many || 1) * 4) + ((product.c || 0) * (product.how_many || 1) * 4) + ((product.f || 0) * (product.how_many || 1) * 9) + ((product.ethanol || 0) * (product.how_many || 1) * 7) )
    }
}

export default countCalories;
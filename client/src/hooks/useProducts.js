const useFilterProduct = () => {
    const searchProduct = (searchTerm, pro) => {
        const search = searchTerm.toLowerCase()
        const searchedProduct = pro.filter((item) => {
            if (!searchTerm) return item

            if (item.title.toLowerCase().includes(search)) {
                return item
            }
            return false
        })
        return searchedProduct
    }

    const filterProduct = (filerType, pro) => {
        let filterProduct
        switch (filerType) {
            case 'default':
                return pro
            case 'shoe':
                filterProduct = pro.filter((item) => {
                    return item.category === 'shoe'
                })

                return filterProduct
            case 'sandal':
                filterProduct = pro
                    .filter((item) => {
                        return item.category === 'sandal'
                    })
                    .map((item) => item)
                return filterProduct
            default:
                return filterProduct
        }
    }

    const sortProduct = (sortType, pro) => {
        let sortProduct
        switch (sortType) {
            case 'default':
                return pro
            case 'ascending':
                sortProduct = pro
                    .sort((a, b) => {
                        let x = a.title.toLowerCase()
                        let y = b.title.toLowerCase()
                        return x === y ? 0 : x < y ? 1 : -1
                    })
                    .map((item) => item)
                return sortProduct
            case 'descending':
                sortProduct = pro
                    .sort((a, b) => {
                        let x = a.title.toLowerCase()
                        let y = b.title.toLowerCase()
                        return x === y ? 0 : x > y ? 1 : -1
                    })
                    .map((item) => item)
                return sortProduct
            case 'highprice':
                sortProduct = pro
                    .sort((a, b) => {
                        return a.price === b.price
                            ? 0
                            : a.price < b.price
                            ? 1
                            : -1
                    })
                    .map((item) => item)
                return sortProduct
            case 'lowprice':
                sortProduct = pro
                    .sort((a, b) => {
                        let x = a.price
                        let y = b.price
                        return x === y ? 0 : x > y ? 1 : -1
                    })
                    .map((item) => item)
                return sortProduct
            default:
                return sortProduct
        }
    }

    return {
        filterProduct,
        searchProduct,
        sortProduct,
    }
}

export default useFilterProduct

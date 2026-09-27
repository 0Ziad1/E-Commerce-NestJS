const generateMessage = (entity: string) => ({
    notFound: `${entity} not found`,
    alreadyExist: `${entity} already exist`,
    created: `${entity} created successfully`,
    updated: `${entity} updated successfully`,
    deleted: `${entity} deleted successfully`,
})

export const MESSAGE = {
    Brand: { ...generateMessage("Brand") },
    Customer: { ...generateMessage("Customer")},
    Product:{...generateMessage("Product")}
}


export const clearFieldsForBookList = (data) => {
    
    if (!data) return data;
    delete data.kind;

    data.items = data.items.map(item => {
        return {   
        id:item?.id,
        etag: item?.etag || '', 
        title: item?.volumeInfo?.title || '',
        authors:item?.volumeInfo?.authors || [],
        categories: item?.volumeInfo?.categories || [],
        image: item?.volumeInfo?.imageLinks?.thumbnail || ''
        }
    });
    return data;
}
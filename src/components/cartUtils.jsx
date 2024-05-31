// cartUtils.js
export const updateCart = () => {
    window.dispatchEvent(new Event('cartUpdated'));
};
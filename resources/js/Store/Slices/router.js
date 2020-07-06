export const getCurrentCvidSelector = state => {
    const path = state.router.location.pathname.split('/');
    return path[path.length - 1];

}

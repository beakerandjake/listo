// TODO switch based on config.
let backing_store;

switch (process.env.BACKING_STORE) {
    case 'sqlite':
        console.log('sqlite');
        backing_store = await import('./sqlite.js');
        break;
    default:
        console.log('memory');
        backing_store = await import('./memory.js');
        break;
}

export default backing_store;

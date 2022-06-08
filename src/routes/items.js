
import * as persistence from '../persistence/memory.js';
import { v4 as uuid } from 'uuid';


export function list(req, res) {
    res.send(persistence.getAll());
}

export function add(req, res) {
    const item = {
        id: uuid(),
        name: req.body.name,
    };

    if (!persistence.add(item)) {
        res.sendStatus(409);
        return;
    }

    res.sendStatus(201);
}

export function remove(req, res) {
    if (persistence.remove(req.params.itemId)) {
        res.sendStatus(200);
        return;
    }

    res.sendStatus(404);
}
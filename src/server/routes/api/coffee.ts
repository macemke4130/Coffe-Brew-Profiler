import * as express from 'express';
import * as passport from 'passport';
import db from '../../db';
import { ReqUser } from '../../utils/types';

const router = express.Router();

router.get('/bag/:coffee', async (req, res) => {
    try {
        const oneCoffee = await db.coffee.one(Number(req.params.coffee));
        res.json(oneCoffee);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.get('/editpull/:coffee', async (req, res) => {
    try {
        const editPull = await db.coffee.editPull(Number(req.params.coffee));
        res.json(editPull);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.put('/editbag/:coffee', async (req, res) => {
    try {
        const editCoffee = await db.coffee.edit(Number(req.params.coffee), req.body);
        res.json(editCoffee);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.get('/all/list', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const allMyCoffeeList = await db.coffee.allMyCoffeeList(Number(req.user.id));
        res.json(allMyCoffeeList);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.get('/all', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const allMyCoffee = await db.coffee.allMyCoffee(Number(req.user.id));
        res.json(allMyCoffee);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.get('/', async (req, res) => {
    try {
        const coffeeBags = await db.coffee.all();
        res.json(coffeeBags);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.post('/new', async (req, res) => {
    try {
        const newCoffeeBag = await db.coffee.insert(req.body);
        res.status(200).json(newCoffeeBag);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.put('/emptybag', passport.authenticate('jwt'), async (req, res) => {
    try {
        const emptyBag = await db.coffee.empty(Number(req.body.id));
        res.json(emptyBag);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

export default router;
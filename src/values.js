import { create, all } from "mathjs";
import * as _ from "lodash";

const config = {
    number: 'Fraction'
}

const math = create(all, config);

/**
 *
 *
 * (Number of fractions [1/limit, limit/1])
 *
 */
const limit = 5;

/**
 *
 *
 *
 */
const startZ = 1;
const endZ = 100;

const allYs = _.uniqWith(_.sortBy(_.flatten(_.range(1, limit + 1).map(num => {
    return _.range(limit, 0, -1).map(denum => {
        return math.fraction(num, denum)
    })
}))), (e1, e2) => {
    return math.equal(e1, e2)
});

const allZs = _.range(startZ, endZ).map(e => math.fraction(e));
const mapping = {};

for (const y of allYs) {
    for (const z of allZs) {
        const x = math.divide(z, (math.add(math.add(1, y), math.multiply(y, y))));
        if (math.isInteger(x)) {
            const xy = x * y;
            const xyy = xy * y;

            if (y in mapping) {
                !mapping[y].x.includes(x) && mapping[y].x.push(x);
                !mapping[y].xy.includes(xy) && mapping[y].xy.push(xy);
                !mapping[y].xyy.includes(xyy) && mapping[y].xyy.push(xyy);
                !mapping[y].z.includes(z) && mapping[y].z.push(z);
            } else {
                mapping[y] = {x: [x], z: [z], xy: [xy], xyy: [xyy]};
            }
        }
    }
}

const getOptions = (y, id) => {
    return _.sortBy(mapping[y][id])
}

const getAllOptions = (y) => {
    return {
        x: getOptions(y, 'x'),
        xy: getOptions(y, 'xy'),
        xyy: getOptions(y, 'xyy'),
        z: getOptions(y, 'z')
    }
}

/**
 *
 * @todo Object.keys turns keys into strings :/
 */
const ys = _.sortBy(_.keys(mapping).map(x => math.fraction(x)));
export { getOptions, getAllOptions, mapping, ys }
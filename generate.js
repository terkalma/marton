const { create, all } = require("mathjs");
const _ = require("lodash");

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
const cache = {};
const f = c => math.format(c, { fraction: 'ratio' });

for (const y of allYs) {
    for (const z of allZs) {
        const x = z / (1 + y + y * y);
        if (math.isInteger(x)) {
            const xy = x * y;
            const xyy = xy * y;

            cache[`y_${f(y)}_x_${f(x)}`] = {xy, xyy, z};
            cache[`y_${f(y)}_xy_${f(xy)}`] = {x, xyy, z};
            cache[`y_${f(y)}_xyy_${f(xyy)}`] = {xy, x, z};
            cache[`y_${f(y)}_z_${f(z)}`] = {xy, xyy, x};

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

const getIndex = (y, id, value) => {
    return cache[`y_${y}_${id}_${value}`]
}


// console.log(JSON.stringify(mapping, null, 2));

console.log(Object.keys(mapping))
// for (const y of allYs) {
//     console.log(y);
//     console.log(mapping[y]);
// }

import { create, all } from "mathjs";
import * as _ from "lodash";

const config = {
    number: 'Fraction'
}

const math = create(all, config);
const limit = 5;

const fracs = _.uniqWith(_.sortBy(_.flatten(_.range(1, limit + 1).map(num => {
    return _.range(limit, 0, -1).map(denum => {
        return math.fraction(num, denum)
    })
}))), (e1, e2) => {
    return math.equal(e1, e2)
});
const formattedFracs = fracs.map(f => math.format(f, { fraction: 'ratio' }));

export { fracs, formattedFracs, math };
import {
    generateBooleanQuery,
    generateMaxQuery, generateOrderQuery,
    generateQuery,
    generateSearchTextQuery,
    generateSkipQuery
} from "./urlGenerator";

describe('Url Generator test', () => {
    const defaultSkip = 0
    const defaultMax = 50
    it('should return empty query', function () {
        let textMap = new Map()
        textMap = textMap.set('test', {id: 'test', checked: false})

        let boolMap = new Map()
        boolMap = boolMap.set('boolTest', {id: 'boolTest', value: 'all'})

        let orderMap = new Map()
        orderMap = orderMap.set('order', {id: 'order', value: 'none'})

        expect(generateQuery('a', textMap, boolMap, defaultSkip, defaultMax, orderMap )).toBe('q={}&max=50&skip=0')
    });

    it('should return only text query', function () {
        let textMap = new Map()
        textMap = textMap.set('test', {id: 'test', checked: true})

        let boolMap = new Map()
        boolMap = boolMap.set('boolTest', {id: 'boolTest', value: 'all'})

        let orderMap = new Map()
        orderMap = orderMap.set('order', {id: 'order', value: 'none'})
        expect(generateQuery('a', textMap, boolMap, defaultSkip, defaultMax, orderMap)).toBe(`q={$or:[{"test":{"$regex":"^.*?a.*?$"}}]}&max=50&skip=0`)
    });

    it('should return only boolean query', function () {
        let textMap = new Map()
        textMap = textMap.set('test', {id: 'test', checked: false})

        let boolMap = new Map()
        boolMap = boolMap.set('boolTest', {id: 'boolTest', value: 'true'})


        let orderMap = new Map()
        orderMap = orderMap.set('order', {id: 'order', value: 'none'})

        expect(generateQuery('a', textMap, boolMap, defaultSkip, defaultMax, orderMap)).toBe(`q={"boolTest":"1"}&max=50&skip=0`)
    });

    it('should return only order query', function () {
        let textMap = new Map()
        textMap = textMap.set('test', {id: 'test', checked: false})

        let boolMap = new Map()
        boolMap = boolMap.set('boolTest', {id: 'boolTest', value: 'all'})

        let orderMap = new Map()
        orderMap = orderMap.set('order', {id: 'order', value: 'asc'})

        expect(generateQuery('a', textMap, boolMap, defaultSkip, defaultMax, orderMap)).toBe(`q={}&max=50&skip=0&h={"$orderby":{"order":1}}`)
    });

    it('should return text, boolean and order query', function () {
        let textMap = new Map()
        textMap = textMap.set('test', {id: 'test', checked: true})

        let boolMap = new Map()
        boolMap = boolMap.set('boolTest', {id: 'boolTest', value: 'true'})

        let orderMap = new Map()
        orderMap = orderMap.set('order', {id: 'order', value: 'asc'})

        expect(generateQuery('a', textMap, boolMap, defaultSkip, defaultMax, orderMap)).toBe(`q={$or:[{"test":{"$regex":"^.*?a.*?$"}}],"boolTest":"1"}&max=50&skip=0&h={"$orderby":{"order":1}}`)
    });

    describe('Text query', () => {
        it('should return empty text query', function () {
            let textMap = new Map()
            textMap = textMap.set('test', {id: 'test', checked: false})

            expect(generateSearchTextQuery('', textMap)).toBe('')

            expect(generateSearchTextQuery('a', textMap)).toBe('')
        });

        it('should return a single text query', function () {
            let textMap = new Map()
            textMap = textMap.set('test', {id: 'test', checked: true})

            expect(generateSearchTextQuery('', textMap)).toBe('')

            expect(generateSearchTextQuery('a', textMap)).toBe(`$or: [  {"test" : {"$regex" : "^.*?a.*?$"}} ]`)
        });

        it('should return a double text query', function () {
            let textMap = new Map()
            textMap = textMap.set('test1', {id: 'test1', checked: true})
            textMap = textMap.set('test2', {id: 'test2', checked: true})

            expect(generateSearchTextQuery('', textMap)).toBe('')

            expect(generateSearchTextQuery('a', textMap)).toBe(`$or: [  {"test1" : {"$regex" : "^.*?a.*?$"}}, {"test2" : {"$regex" : "^.*?a.*?$"}} ]`)
        });
    })

    describe('Boolean query', () => {
        it('should return empty boolean query', function () {
            let boolMap = new Map()
            boolMap = boolMap.set('bool', {id: 'bool', value: 'all'})

            expect(generateBooleanQuery(boolMap)).toBe('')
        });
        it('should return a single true boolean query', function () {
            let boolMap = new Map()
            boolMap = boolMap.set('bool', {id: 'bool', value: 'true'})

            expect(generateBooleanQuery(boolMap)).toBe(` "bool": "1"`)
        });
        it('should return a single false boolean query', function () {
            let boolMap = new Map()
            boolMap = boolMap.set('bool', {id: 'bool', value: 'false'})

            expect(generateBooleanQuery(boolMap)).toBe(` "bool": "0"`)
        });
    })

    describe('Order Query', () => {
        it('should return empty order query', function () {
            let orderMap = new Map()
            orderMap.set('order', {id: 'order', value: 'none'})

            expect(generateOrderQuery(orderMap)).toBe('')
        });

        it('should return asc order query', function () {
            let orderMap = new Map()
            orderMap.set('order', {id: 'order', value: 'asc'})

            expect(generateOrderQuery(orderMap)).toBe('&h={ "$orderby": {"order": 1 } }')
        });

        it('should return desc order query', function () {
            let orderMap = new Map()
            orderMap.set('order', {id: 'order', value: 'desc'})

            expect(generateOrderQuery(orderMap)).toBe('&h={ "$orderby": {"order": -1 } }')
        });

        it('should return asc and desc order query', function () {
            let orderMap = new Map()
            orderMap.set('order1', {id: 'order1', value: 'asc'})
            orderMap.set('order2', {id: 'order2', value: 'desc'})
            orderMap.set('order3', {id: 'order3', value: 'none'})

            expect(generateOrderQuery(orderMap)).toBe('&h={ "$orderby": {"order1": 1,"order2": -1 } }')
        });
    })

    describe('Skip query', () => {
        it('should return skip query', function () {

            expect(generateSkipQuery(10)).toBe('&skip=10')
        });
    })
    describe('Max query', () => {
        it('should return max query', function () {

            expect(generateMaxQuery(10)).toBe('&max=10')
        });
    })
})
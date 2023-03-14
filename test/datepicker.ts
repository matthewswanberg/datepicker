import Datepicker from '../src/datepicker';
import { expect } from 'chai'
var jsdom = require('mocha-jsdom')

describe('datepicker', ()=> {
    jsdom({
        url: 'https://example.org/',
      })

    it("should initialize with today's date", () => {
        const picker = new Datepicker()
        const today = new Date();

        expect(picker.selectedDate).to.equal(today);
    })
})
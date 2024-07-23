import {formatCurrency} from '../scripts/utils/money.js';

console.log('test-case-1');
if(formatCurrency(2095) === '20.95')
    console.log('passed');
else console.log('failed');

console.log('test-case-2');
if(formatCurrency(0) === '0.00')
    console.log('passed');
else console.log('failed');

console.log('test-case-3');
if(formatCurrency(2000.5) === '20.01')
    console.log('passed');
else console.log('failed');
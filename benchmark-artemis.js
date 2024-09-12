const Immutable = require('./src/seamless-immutable');


function generateLargeObject(depth, breadth) {
    var obj = {};
    for (var i = 0; i < breadth; i++) {
      obj['key' + i] = depth > 0 ? generateLargeObject(depth - 1, breadth) : 'value' + i;
    }
    return obj;
  }
  
  // Function to generate a large array
  function generateLargeArray(size) {
    var arr = [];
    for (var i = 0; i < size; i++) {
      arr.push(i);
    }
    return arr;
  }
  
  // Parameters for the size of data structures
  var objectDepth = 4;    // Adjust as needed
  var objectBreadth = 10; // Adjust as needed
  var arraySize = 50000000;  // Adjust as needed
  
  // Generate large data structures
  var largeObject = generateLargeObject(objectDepth, objectBreadth);
  var largeArray = generateLargeArray(arraySize);
  
  // Benchmark Immutable operations
  
  console.time('Immutable Object Creation');
  var immutableObject = Immutable(largeObject);
  console.timeEnd('Immutable Object Creation');
  
  console.time('Immutable Array Creation');
  var immutableArray = Immutable(largeArray);
  console.timeEnd('Immutable Array Creation');
  
  console.time('Deep Merge');
  var mergedObject = immutableObject.merge({ key0: { key0: { key0: 'newValue' } } }, { deep: true });
  console.timeEnd('Deep Merge');
  
  console.time('Set In Nested Object');
  var updatedObject = immutableObject.setIn(['key0', 'key0', 'key0'], 'newValue');
  console.timeEnd('Set In Nested Object');
  
  console.time('Array Map');
  var mappedArray = immutableArray.map(function (value) {
    return value * 2;
  });
  console.timeEnd('Array Map');
  
  console.time('Array FlatMap');
  var flatMappedArray = immutableArray.flatMap(function (value) {
    return [value, value * 2];
  });
  console.timeEnd('Array FlatMap');
  
  console.time('Array Iteration');
  var sum = 0;
  for (var i = 0, len = immutableArray.length; i < len; i++) {
    sum += immutableArray[i];
  }
  console.timeEnd('Array Iteration');
  
  console.log('Sum of array elements:', sum);